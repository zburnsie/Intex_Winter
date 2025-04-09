const API_URL = 'https://localhost:5000/api/Prediction';

export interface Recommendation {
    id: number;
    showId?: "";
    userId?: number;
}

async function handleResponse(response: Response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
// Content-Based
export const fetchContentBased = async (showId: string): Promise<Recommendation[]> => {
    const response = await fetch(`${API_URL}/content-based/${showId}`);
    return handleResponse(response);
}
// Hybrid-Weighted
export const fetchHybrid = async (showId: number): Promise<Recommendation[]> => {
    const response = await fetch(`${API_URL}/hybrid/${showId}`);
    return handleResponse(response);
  };
  
  // Item-to-Item Collaborative
  export const fetchItemToItem = async (showId: number): Promise<Recommendation[]> => {
    const response = await fetch(`${API_URL}/item-to-item/${showId}`);
    return handleResponse(response);
  };
  
  // Popularity-Based
  export const fetchPopularity = async (showId: number): Promise<Recommendation[]> => {
    const response = await fetch(`${API_URL}/popularity/${showId}`);
    return handleResponse(response);
  };
  
  // User-Based Collaborative
  export const fetchUserBased = async (userId: number): Promise<Recommendation[]> => {
    const response = await fetch(`${API_URL}/user/${userId}`);
    return handleResponse(response);
  };