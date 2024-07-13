import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

export const fetchCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for post with ID ${postId}:`, error);
    throw error;
  }
};