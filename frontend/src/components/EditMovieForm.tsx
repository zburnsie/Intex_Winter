import { useState } from "react";
import { Movie } from "../types/Movie";
import { updateMovie } from "../api/MoviesAPI";

interface EditMovieFormData {
    showId: string;
    title: string;
    director: string;
    releaseYear: number;
    rating: string;
    description?: string;
    action?: number;
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
        director: movie.director ?? "",
        releaseYear: movie.releaseYear ?? new Date().getFullYear(),
        rating: movie.rating ?? "",
        description: movie.description ?? "",
        action: movie.action ?? 0,
    });

    const toFullMovie = (data: EditMovieFormData): Movie => ({
        showId: data.showId,
        type: movie.type,
        title: data.title,
        director: data.director,
        cast: movie.cast,
        country: movie.country,
        releaseYear: data.releaseYear,
        rating: data.rating,
        duration: movie.duration,
        description: data.description ?? movie.description ?? null,
        action: data.action ?? movie.action ?? null,
        adventure: movie.adventure,
        animeSeriesInternationalTvShows: movie.animeSeriesInternationalTvShows,
        britishTvShowsDocuseriesInternationalTvShows: movie.britishTvShowsDocuseriesInternationalTvShows,
        children: movie.children,
        comedies: movie.comedies,
        comediesDramasInternationalMovies: movie.comediesDramasInternationalMovies,
        comediesInternationalMovies: movie.comediesInternationalMovies,
        comediesRomanticMovies: movie.comediesRomanticMovies,
        crimeTvShowsDocuseries: movie.crimeTvShowsDocuseries,
        documentaries: movie.documentaries,
        documentariesInternationalMovies: movie.documentariesInternationalMovies,
        docuseries: movie.docuseries,
        dramas: movie.dramas,
        dramasInternationalMovies: movie.dramasInternationalMovies,
        dramasRomanticMovies: movie.dramasRomanticMovies,
        familyMovies: movie.familyMovies,
        fantasy: movie.fantasy,
        horrorMovies: movie.horrorMovies,
        internationalMoviesThrillers: movie.internationalMoviesThrillers,
        internationalTvShowsRomanticTvShowsTvDramas: movie.internationalTvShowsRomanticTvShowsTvDramas,
        kidsTv: movie.kidsTv,
        languageTvShows: movie.languageTvShows,
        musicals: movie.musicals,
        natureTv: movie.natureTv,
        realityTv: movie.realityTv,
        spirituality: movie.spirituality,
        tvAction: movie.tvAction,
        tvComedies: movie.tvComedies,
        tvDramas: movie.tvDramas,
        talkShowsTvComedies: movie.talkShowsTvComedies,
        thrillers: movie.thrillers,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateMovie(formData.showId!, toFullMovie(formData));
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
            <br />
        </form>
    );
}

export default EditMovieForm;