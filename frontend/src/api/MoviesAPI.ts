import { Movie } from "../types/Movie";

interface FetchMoviesResponse {
    movies: Movie[];
    totalMovies: number;
}

// const API_URL = 'https://localhost:5000/api/Movie'
const API_URL = 'https://intex-312-backend-btgbgsf0g8aegcdr.eastus-01.azurewebsites.net/api/Movie';



export const fetchMovies = async (
    pageSize: number,
    pageNum: number,
    selectedGenre: any[],
    searchTerm: string = ""
): Promise<FetchMoviesResponse> => {
    try {
        const genre = selectedGenre
            .map((g) => `movieGenres=${g}`)
            .join("&");

        const query = new URLSearchParams({
            pageSize: pageSize.toString(),
            pageNum: pageNum.toString(),
            search: searchTerm
        });

        if (genre.length > 0) {
            query.append("genreString", genre);
        }

        const response = await fetch(
            `${API_URL}/AllMovies?${query.toString()}`
        );

        if (!response.ok) {
            throw new Error(`Error fetching movies: ${response.statusText}`);
        }

        const rawData = await response.json();
        console.log('Fetched movie data:', rawData);
        return rawData;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
    try {
        const response = await fetch(`${API_URL}/addMovie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
        });
        
        if (!response.ok) {
            throw new Error(`Error adding movie: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error adding movie:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};

export const updateMovie = async (showId: string, updatedMovie: Movie) : Promise<Movie> => {
    try {
        const response = await fetch(`${API_URL}/updateMovie/${showId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovie),
        });

        if (!response.ok) {
            throw new Error(`Error updating movie: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating movie:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};

export const deleteMovie = async (showId: string): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/deleteMovie/${showId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Error deleting movie: ${response.statusText}`);
        }
    } catch (error) {
        console.error("Error deleting movie:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};