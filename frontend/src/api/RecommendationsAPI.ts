const API_URL = 'https://localhost:5000/api/Prediction';

export interface Recommendation {
    id: number;
    showId?: "";
    userId?: number;
}

async function handlResponse(response: Response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export const fetchContentBased = async (showId: string): Promise<Recommendation[]> => {
    const response = await fetch(`${API_URL}/content-based/${showId}`);
    return handlResponse(response);
}