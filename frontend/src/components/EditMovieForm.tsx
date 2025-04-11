import { useState } from "react";
import { Movie } from "../types/Movie";
import { updateMovie } from "../api/MoviesAPI";
import { getGenresFromMovie, genreMap } from "./genreUtils";

interface EditMovieFormData {
    showId: string;
    title: string;
    duration: string;
    director: string;
    releaseYear: number;
    rating: string;
    description?: string;
    action?: number | null; // Ensure 'action' matches the Movie type
    genres: string[]; // Added genres field
    type: string; // Added type field
}

interface EditMovieProps {
    movie: Movie;
    onSuccess: () => void;
    onCancel: () => void; 
}

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieProps) => {
    const [formData, setFormData] = useState<EditMovieFormData>({
        showId: movie.showId!,
        title: movie.title ?? "",
        duration: movie.duration ?? "",
        director: movie.director ?? "",
        releaseYear: movie.releaseYear ?? new Date().getFullYear(),
        rating: movie.rating ?? "",
        description: movie.description ?? "",
        genres: getGenresFromMovie(movie), // Initialize genres with detected genres
        type: movie.type ?? "", // Initialize type with movie type
    });

    const toFullMovie = (data: EditMovieFormData): Movie => {
        const reverseGenreMap = Object.entries(genreMap).reduce((acc, [key, label]) => {
            acc[label] = key;
            return acc;
        }, {} as Record<string, string>);

        const genreFlags = Object.fromEntries(
            Object.entries(reverseGenreMap).map(([label, fieldName]) => [
                fieldName,
                data.genres.includes(label) ? 1 : 0
            ])
        );

        return {
            showId: data.showId,
            type: data.type, // Use the edited type
            title: data.title,
            director: data.director,
            cast: movie.cast,
            country: movie.country,
            releaseYear: data.releaseYear,
            rating: data.rating,
            duration: data.duration,
            description: data.description ?? movie.description ?? null,
            action: genreFlags.action ?? 0,
            adventure: genreFlags.adventure ?? 0,
            animeSeriesInternationalTvShows: genreFlags.animeSeriesInternationalTvShows ?? 0,
            britishTvShowsDocuseriesInternationalTvShows: genreFlags.britishTvShowsDocuseriesInternationalTvShows ?? 0,
            children: genreFlags.children ?? 0,
            comedies: genreFlags.comedies ?? 0,
            comediesDramasInternationalMovies: genreFlags.comediesDramasInternationalMovies ?? 0,
            comediesInternationalMovies: genreFlags.comediesInternationalMovies ?? 0,
            comediesRomanticMovies: genreFlags.comediesRomanticMovies ?? 0,
            crimeTvShowsDocuseries: genreFlags.crimeTvShowsDocuseries ?? 0,
            documentaries: genreFlags.documentaries ?? 0,
            documentariesInternationalMovies: genreFlags.documentariesInternationalMovies ?? 0,
            docuseries: genreFlags.docuseries ?? 0,
            dramas: genreFlags.dramas ?? 0,
            dramasInternationalMovies: genreFlags.dramasInternationalMovies ?? 0,
            dramasRomanticMovies: genreFlags.dramasRomanticMovies ?? 0,
            familyMovies: genreFlags.familyMovies ?? 0,
            fantasy: genreFlags.fantasy ?? 0,
            horrorMovies: genreFlags.horrorMovies ?? 0,
            internationalMoviesThrillers: genreFlags.internationalMoviesThrillers ?? 0,
            internationalTvShowsRomanticTvShowsTvDramas: genreFlags.internationalTvShowsRomanticTvShowsTvDramas ?? 0,
            kidsTv: genreFlags.kidsTv ?? 0,
            languageTvShows: genreFlags.languageTvShows ?? 0,
            musicals: genreFlags.musicals ?? 0,
            natureTv: genreFlags.natureTv ?? 0,
            realityTv: genreFlags.realityTv ?? 0,
            spirituality: genreFlags.spirituality ?? 0,
            tvAction: genreFlags.tvAction ?? 0,
            tvComedies: genreFlags.tvComedies ?? 0,
            tvDramas: genreFlags.tvDramas ?? 0,
            talkShowsTvComedies: genreFlags.talkShowsTvComedies ?? 0,
            thrillers: genreFlags.thrillers ?? 0,
            ...genreFlags,
        };
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updated = toFullMovie(formData);
            console.log("Updating movie with data:", updated);
            await updateMovie(formData.showId!, updated);
            onSuccess();
        } catch (err) {
            console.error("Failed to update movie:", err);
            alert("Failed to update movie. Please check the console for details.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a type</option>
                    <option value="Movie">Movie</option>
                    <option value="TV Show">TV Show</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Duration</label>
                <input
                    type="text"
                    className="form-control"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="director" className="form-label">Director</label>
                <input
                    type="text"
                    className="form-control"
                    id="director"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="releaseYear" className="form-label">Release Year</label>
                <input
                    type="number"
                    className="form-control"
                    id="releaseYear"
                    name="releaseYear"
                    value={formData.releaseYear}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                <select
                    className="form-select"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a rating</option>
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                    <option value="NC-17">NC-17</option>
                    <option value="TV-Y">TV-Y</option>
                    <option value="TV-Y7">TV-Y7</option>
                    <option value="TV-G">TV-G</option>
                    <option value="TV-PG">TV-PG</option>
                    <option value="TV-14">TV-14</option>
                    <option value="TV-MA">TV-MA</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="genrePicker" className="form-label">Genres</label>
                <div className="d-flex gap-2">
                    <select
                        id="genrePicker"
                        className="form-select"
                        onChange={(e) => {
                            const selected = e.target.value;
                            if (selected && !formData.genres.includes(selected)) {
                                setFormData((prev) => ({
                                    ...prev,
                                    genres: [...prev.genres, selected]
                                }));
                            }
                            e.target.value = "";
                        }}
                    >
                        <option value="">Select a genre</option>
                        {[
                            "Action", "Adventure", "Anime", "Comedy", "Crime", "Documentary",
                            "Drama", "Family", "Fantasy", "Horror", "International", "Kids",
                            "Musical", "Nature", "Reality", "Romance", "Sci-Fi", "Spiritual",
                            "Thriller", "TV", "Western"
                        ].map((genre) => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-2 d-flex flex-wrap gap-2">
                    {formData.genres.map((genre) => (
                        <span key={genre} className="badge bg-secondary">
                            {genre}
                            <button
                                type="button"
                                className="btn-close btn-close-white ms-2"
                                aria-label="Remove"
                                onClick={() => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        genres: prev.genres.filter((g) => g !== genre)
                                    }));
                                }}
                            ></button>
                        </span>
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </div>
            <br />
        </form>
    );
}

export default EditMovieForm;