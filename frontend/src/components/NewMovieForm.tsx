import { useState } from "react";
import { Movie } from "../types/Movie";
import { addMovie } from "../api/MoviesAPI";

interface NewMovieFormData {
    title: string;
    director: string;
    releaseYear?: number;
    rating: string;
    description?: string;
    genres: string[];
}

interface NewMovieProps {
    onSuccess: () => void;
    onCancel: () => void; 
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieProps) => {
    const [formData, setFormData] = useState<NewMovieFormData>({
        title: "",
        director: "",
        releaseYear: undefined,
        rating: "",
        description: "",
        genres: [],
    });

    const toFullMovie = (data: NewMovieFormData): Movie => ({
        showId: null,
        type: null,
        title: data.title,
        director: data.director,
        cast: null,
        country: null,
        releaseYear: data.releaseYear ?? null,
        rating: data.rating,
        duration: null,
        description: data.description ?? null,
        action: null,
        adventure: null,
        animeSeriesInternationalTvShows: null,
        britishTvShowsDocuseriesInternationalTvShows: null,
        children: null,
        comedies: null,
        comediesDramasInternationalMovies: null,
        comediesInternationalMovies: null,
        comediesRomanticMovies: null,
        crimeTvShowsDocuseries: null,
        documentaries: null,
        documentariesInternationalMovies: null,
        docuseries: null,
        dramas: null,
        dramasInternationalMovies: null,
        dramasRomanticMovies: null,
        familyMovies: null,
        fantasy: null,
        horrorMovies: null,
        internationalMoviesThrillers: null,
        internationalTvShowsRomanticTvShowsTvDramas: null,
        kidsTv: null,
        languageTvShows: null,
        musicals: null,
        natureTv: null,
        realityTv: null,
        spirituality: null,
        tvAction: null,
        tvComedies: null,
        tvDramas: null,
        talkShowsTvComedies: null,
        thrillers: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting movie:", formData);

        const fullMovie = toFullMovie(formData);
        console.log("Full movie object:", fullMovie);

        try {
            const addedMovie = await addMovie(fullMovie);
            console.log("Movie added successfully:", addedMovie);
            onSuccess();
        } catch (error) {
            console.error("Error adding movie:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-3">
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
                    value={formData.releaseYear ?? ""}
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
            <div className="d-flex justify-content-center gap-2 mb-4">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
}

export default NewMovieForm;