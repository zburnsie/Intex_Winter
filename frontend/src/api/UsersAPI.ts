import { User } from "../types/User";

interface FetchUsersResponse {
    users: User[];
    totalUsers: number;
}

const API_URL = 'https://localhost:5000/api/User'

export const fetchUsers = async (): Promise<FetchUsersResponse> => {
    try {
        const response = await fetch(`${API_URL}/AllUsers`);

        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.statusText}`);
        }

        const rawData = await response.json();
        console.log('Fetched user data:', rawData);
        return rawData;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}