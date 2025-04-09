import { Rating } from "../types/Rating";

interface FetchRatingsResponse {
    ratings: Rating[];
    totalRatings: number;
}

const API_URL = 'https://localhost:5000/api/Rating'

export const fetchRatings = async () : Promise<FetchRatingsResponse> => {
    try {
        const response = await fetch(`${API_URL}/AllRatings`);

        if (!response.ok) {
            throw new Error(`Error fetching ratings: ${response.statusText}`);
        }

        const rawData = await response.json();
        console.log('Fetched rating data:', rawData);
        return rawData;
    } catch (error) {
        console.error("Error fetching ratings:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}
