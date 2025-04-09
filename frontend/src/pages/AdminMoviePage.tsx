import { useEffect, useState } from 'react';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import Pagination from '../components/Pagination';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';
import { getGenresFromMovie } from '../components/genreUtils';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import './AdminPage.css';

const AdminMoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(50);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadMovies = async () => {
    try {
      const data = await fetchMovies(pageSize, pageNum, [], searchTerm);
      setMovies(data?.movies ?? []);
      setTotalPages(Math.ceil(data.totalMovies / pageSize));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [pageSize, pageNum]);

  const handleDelete = async (showId: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(showId);
      setMovies(movies.filter((m) => m.showId !== showId));
      alert('Movie deleted successfully.');
    } catch (error) {
      console.error('Failed to delete movie:', (error as Error).message);
      setError('Failed to delete the movie. Please try again.');
      alert('Failed to delete the movie.');
    }
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <AuthorizeView>
      <span>
        <Logout>
          Logout <AuthorizedUser value="email" />
        </Logout>
      </span>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col px-3">
            <h1 className="text-center">Admin Page</h1>
            {!showForm && (
              <div className="d-flex justify-content-between align-items-center mb-3">
                <button
                  className="btn btn-success"
                  onClick={() => setShowForm(true)}
                >
                  Add New Movie
                </button>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPageNum(1);
                    loadMovies();
                  }}
                  className="d-flex gap-2"
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setSearchTerm('');
                      setPageNum(1);
                      setMovies([]);
                      setLoading(true);
                      setError(null);
                      fetchMovies(pageSize, 1, [], '')
                        .then((data) => {
                          setMovies(data?.movies ?? []);
                          setTotalPages(Math.ceil(data.totalMovies / pageSize));
                        })
                        .catch((error) => {
                          setError((error as Error).message);
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    }}
                  >
                    Clear
                  </button>
                </form>
              </div>
            )}
            {showForm && (
              <NewMovieForm
                onSuccess={() => {
                  setShowForm(false);
                  loadMovies();
                }}
                onCancel={() => setShowForm(false)}
              />
            )}
            {editingMovie && (
              <div
                className="modal fade show d-block"
                tabIndex={-1}
                role="dialog"
                onClick={() => setEditingMovie(null)}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              >
                <div
                  className="modal-dialog modal-lg"
                  role="document"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Movie</h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setEditingMovie(null)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <EditMovieForm
                        movie={editingMovie}
                        onSuccess={() => {
                          setEditingMovie(null);
                          loadMovies();
                        }}
                        onCancel={() => setEditingMovie(null)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col">
                <div className="table-responsive">
                  <table className="table table-sm table-striped table-bordered align-middle text-start shadow-sm">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Release Year</th>
                        <th>Type</th>
                        <th>Rating</th>
                        <th>Duration</th>
                        <th>Genres</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      {movies.map((movie) => (
                        <tr key={movie.showId}>
                          <td>{movie.title}</td>
                          <td>{movie.director ?? '—'}</td>
                          <td>{movie.releaseYear}</td>
                          <td>{movie.type}</td>
                          <td>{movie.rating}</td>
                          <td>{movie.duration}</td>
                          <td>{getGenresFromMovie(movie).join(', ') || '—'}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-2">
                              <button
                                onClick={() => setEditingMovie(movie)}
                                className="btn btn-warning btn-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(movie.showId!)}
                                className="btn btn-danger btn-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row mt-3 mb-5 align-items-center">
              <div className="col-md-6">
                <p className="mb-0">
                  Showing {(pageNum - 1) * pageSize + 1} to{' '}
                  {Math.min(pageNum * pageSize, movies.length)} of{' '}
                  {movies.length} entries
                </p>
              </div>
              <div className="col-md-6 text-end">
                <Pagination
                  currentPage={pageNum}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={setPageNum}
                  onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthorizeView>
  );
};

export default AdminMoviePage;
