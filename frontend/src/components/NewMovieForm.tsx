import { useState } from "react";
import { Movie } from "../types/Movie";
import { addMovie } from "../api/MoviesAPI";

interface NewMovieFormData {
    title: string;
    director: string;
    releaseYear: number;
    rating: string;
    description?: string;
    action?: number;
}

interface NewMovieProps {
    onSuccess: () => void;
    onCancel: () => void; 
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieProps) => {
    const [formData, setFormData] = useState<NewMovieFormData>({
        title: "",
        director: "",
        releaseYear: 0,
        rating: "",
        description: "",
        action: 0,
    });

    const toFullMovie = (data: NewMovieFormData): Movie => ({
        showId: null,
        type: null,
        title: data.title,
        director: data.director,
        cast: null,
        country: null,
        releaseYear: data.releaseYear,
        rating: data.rating,
        duration: null,
        description: data.description ?? null,
        action: data.action ?? null,
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addMovie(toFullMovie(formData));
        onSuccess();
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
                    value={formData.releaseYear}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                <input
                    type="text"
                    className="form-control"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                />
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
                <label htmlFor="action" className="form-label">Action Score</label>
                <input
                    type="number"
                    className="form-control"
                    id="action"
                    name="action"
                    value={formData.action}
                    onChange={handleChange}
                />
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    );
}

export default NewMovieForm;