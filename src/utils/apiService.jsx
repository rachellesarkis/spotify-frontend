import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getGenres = async () => {
  try {
    const response = await apiClient.get("/genres");
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error.message);
    throw error;
  }
};

export const getArtistsByGenre = async (genre) => {
  try {
    const response = await apiClient.get(
      `/artists/${encodeURIComponent(genre)}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching artists for genre "${genre}":`,
      error.message
    );
    throw error;
  }
};
