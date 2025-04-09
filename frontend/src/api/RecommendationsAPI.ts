import { ContentBasedRecommendation } from '../types/contentBasedRecommendation';
import { HybridWeightedRecommendation } from '../types/hybridWeightedRecommendation';
import { ItemToItemCollaborativeRecommendation } from '../types/itemToItemCollaborativeRecommendation';
import { PopularityBasedRecommendation } from '../types/popularityBasedRecommendation';
import { UserBasedCollaborativeRecommendation } from '../types/userBasedCollaborativeRecommendation';

const API_URL = 'https://localhost:5000/api/Prediction';

async function handleResponse(response: Response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
// Content-Based
export const fetchContentBased = async (showId: string): Promise<ContentBasedRecommendation[]> => {
    const response = await fetch(`${API_URL}/content-based/${showId}`);
    return handleResponse(response);
}
// Hybrid-Weighted
export const fetchHybrid = async (showId: number): Promise<HybridWeightedRecommendation[]> => {
    const response = await fetch(`${API_URL}/hybrid/${showId}`);
    return handleResponse(response);
  };
  
  // Item-to-Item Collaborative
  export const fetchItemToItem = async (showId: number): Promise<ItemToItemCollaborativeRecommendation[]> => {
    const response = await fetch(`${API_URL}/item-to-item/${showId}`);
    return handleResponse(response);
  };
  
  // Popularity-Based
  export const fetchPopularity = async (showId: number): Promise<PopularityBasedRecommendation[]> => {
    const response = await fetch(`${API_URL}/popularity/${showId}`);
    return handleResponse(response);
  };
  
  // User-Based Collaborative
  export const fetchUserBased = async (userId: number): Promise<UserBasedCollaborativeRecommendation[]> => {
    const response = await fetch(`${API_URL}/user/${userId}`);
    return handleResponse(response);
  };