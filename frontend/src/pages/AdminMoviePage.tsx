import { useEffect, useState } from "react";
import { deleteMovie, fetchMovies } from "../api/MoviesAPI";
import { Movie } from "../types/Movie"; // Adjust the path based on your project structure
import Pagination from "../components/Pagination";
import NewMovieForm from "../components/NewMovieForm";
import EditMovieForm from "../components/EditMovieForm";


const AdminMoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(50); // Example page size for pagination
    const [pageNum, setPageNum] = useState<number>(1); // Current page number for pagination
    const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages for pagination
    const [showForm, setShowForm] = useState<boolean>(false); // State to control the visibility of the form for adding a new movie
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null); // State to track the movie being edited
    const [searchTerm, setSearchTerm] = useState<string>(""); // State for the search term

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchMovies(pageSize, pageNum, []); // Assuming pageNum is 1 for now
                setMovies(data?.movies ?? []);;
                setTotalPages(Math.ceil(data.totalMovies / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        loadMovies(); // Call the function to fetch movies
    }, [pageSize, pageNum]);

    const filteredMovies = movies.filter((movie) =>
        movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Filtered movie list based on search term

    const handleDelete = async (showId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if (!confirmDelete) return;
        
        try {
            await deleteMovie(showId); // Call the API to delete the movie
            setMovies(movies.filter((m) => m.showId !== showId)); // Update the state to remove the deleted movie
            alert("Movie deleted successfully.");
        } catch (error) {
            // Handle error
            console.error("Failed to delete movie:", (error as Error).message);
            setError("Failed to delete the movie. Please try again.");
            alert("Failed to delete the movie.");
        }
    };

    if (loading) return (<p>Loading movies...</p>); // Display loading message while fetching movies
    if (error) return (<p className="text-red-500">Error: {error}</p>); // Display error message if there was an error fetching movies

    return (
        <>
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col px-3">
                    <h1 className="text-center">Admin Page</h1>
                    {!showForm && (
                        <div className="row mb-3">
                            <div className="col d-flex justify-content-end align-items-center gap-2">
                                <input
                                    type="text"
                                    className="form-control w-auto"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="btn btn-success"
                                >
                                    Add New Movie
                                </button>
                            </div>
                        </div>
                    )}
                    {showForm && (
                        <NewMovieForm
                            onSuccess={() => {
                                setShowForm(false);
                                fetchMovies(pageSize, pageNum, []).then((data) => setMovies(data.movies)); // Refresh the movie list after adding a new movie
                            }}
                            onCancel={() => setShowForm(false)} // Hide the form when cancelled
                        />
                    )}

                    {editingMovie && (
                        <div
                            className="modal fade show d-block"
                            tabIndex={-1}
                            role="dialog"
                            onClick={() => setEditingMovie(null)}
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
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
                                                fetchMovies(pageSize, pageNum, []).then((data) => setMovies(data.movies));
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
                                            <th>Rating</th>
                                            <th>Action Score</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        {filteredMovies.map((movie) => (
                                            <tr key={movie.showId}>
                                                <td>{movie.title}</td>
                                                <td>{movie.director ?? "—"}</td>
                                                <td>{movie.releaseYear}</td>
                                                <td>{movie.rating}</td>
                                                <td>{movie.action}</td>
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
                                Showing {(pageNum - 1) * pageSize + 1} to {Math.min(pageNum * pageSize, filteredMovies.length)} of {filteredMovies.length} entries
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
        </>
    );
}

export default AdminMoviePage;