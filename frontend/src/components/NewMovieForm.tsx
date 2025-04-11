import { useState } from "react";
import { Movie } from "../types/Movie";
import { addMovie } from "../api/MoviesAPI";

interface NewMovieFormData {
    type: string;
    title: string;
    director: string;
    releaseYear?: number;
    duration?: string;
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
        type: "",
        title: "",
        director: "",
        releaseYear: undefined,
        duration: "",
        rating: "",
        description: "",
        genres: [],
    });

    const toFullMovie = (data: NewMovieFormData): Movie => {
        const hasGenre = (genre: string) => data.genres.includes(genre);
      
        return {
          showId: undefined,
          type: data.type || "",
          title: data.title || "",
          director: data.director || "",
          cast: "", // avoid null
          country: "",
          releaseYear: data.releaseYear ?? 0,
          rating: data.rating || "",
          duration: data.duration || "",
          description: data.description || "",
      
          // All genre flags MUST default to 0 instead of null
          action: hasGenre("Action") ? 1 : 0,
          adventure: hasGenre("Adventure") ? 1 : 0,
          animeSeriesInternationalTvShows: hasGenre("Anime") ? 1 : 0,
          britishTvShowsDocuseriesInternationalTvShows: 0,
          children: hasGenre("Kids") ? 1 : 0,
          comedies: hasGenre("Comedy") ? 1 : 0,
          comediesDramasInternationalMovies: 0,
          comediesInternationalMovies: 0,
          comediesRomanticMovies: hasGenre("Romance") && hasGenre("Comedy") ? 1 : 0,
          crimeTvShowsDocuseries: hasGenre("Crime") ? 1 : 0,
          documentaries: hasGenre("Documentary") ? 1 : 0,
          documentariesInternationalMovies: 0,
          docuseries: 0,
          dramas: hasGenre("Drama") ? 1 : 0,
          dramasInternationalMovies: 0,
          dramasRomanticMovies: hasGenre("Romance") && hasGenre("Drama") ? 1 : 0,
          familyMovies: hasGenre("Family") ? 1 : 0,
          fantasy: hasGenre("Fantasy") ? 1 : 0,
          horrorMovies: hasGenre("Horror") ? 1 : 0,
          internationalMoviesThrillers: hasGenre("International") && hasGenre("Thriller") ? 1 : 0,
          internationalTvShowsRomanticTvShowsTvDramas: hasGenre("International") && hasGenre("Romance") ? 1 : 0,
          kidsTv: hasGenre("Kids") ? 1 : 0,
          languageTvShows: 0,
          musicals: hasGenre("Musical") ? 1 : 0,
          natureTv: hasGenre("Nature") ? 1 : 0,
          realityTv: hasGenre("Reality") ? 1 : 0,
          spirituality: hasGenre("Spiritual") ? 1 : 0,
          tvAction: hasGenre("TV") && hasGenre("Action") ? 1 : 0,
          tvComedies: hasGenre("TV") && hasGenre("Comedy") ? 1 : 0,
          tvDramas: hasGenre("TV") && hasGenre("Drama") ? 1 : 0,
          talkShowsTvComedies: 0,
          thrillers: hasGenre("Thriller") ? 1 : 0
        };
      };
      

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