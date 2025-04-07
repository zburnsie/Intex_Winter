import { useEffect, useState } from "react";


const AdminMoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(10); // Example page size for pagination
    const [pageNum, setPageNum] = useState<number>(1); // Current page number for pagination
    const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages for pagination
    const [showForm, setShowForm] = useState<boolean>(false); // State to control the visibility of the form for adding a new movie
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null); // State to track the movie being edited

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchMovies(pageSize, 1, []); // Assuming pageNum is 1 for now
                setMovies(data.movies);
                setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        loadMovies(); // Call the function to fetch movies
    }, [pageSize, pageNum]);

    const handleDelete = async (movieId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
        if (!confirmDelete) return;
        
        try {
            await deleteMovie(movieId); // Call the API to delete the movie
            setMovies(movies.filter((m) => m.movieId !== movieId)); // Update the state to remove the deleted movie
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
        <div>
            <h1>Admin Page</h1>
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)} // Show the form to add a new movie
                    className="btn btn-success mb-3"
                >
                    Add New Movie
                </button>
            )}
            {showForm && (
                <NewMovieForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchMovies(pageSize, pageNum, []).then((data) => setProjects(data.movies)); // Refresh the movie list after adding a new movie
                    }}
                    onCancel={() => setShowForm(false)} // Hide the form when cancelled
                />
            )}

            {editingMovie && (
                <EditMovieForm 
                    movie={editingMovie} 
                    onSuccess={() => {
                        setEditingMovie(null); // Clear the editing state
                        fetchMovies(pageSize, pageNum, []).then((data) => setMovies(data.movies)); // Refresh the movie list after editing
                    }}
                    onCancel={() => setEditingMovie(null)} // Clear the editing state when cancelled
                />
            )}

            <p>Manage Movies</p>
            
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        
                    </tr>
                
                </thead>

            </table>
        </div>
        </>
    );
}

export default AdminMoviePage;