import { useEffect, useState } from "react";


const AdminMoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(10); // Example page size for pagination
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
    }, [pageSize]);


    return (
        <>
        <div>
            <h1>Admin Page</h1>
            <p>This is the admin page for managing movies.</p>
            {/* You can add more components or functionality here as needed */}
        </div>
        </>
    );
}

export default AdminMoviePage;