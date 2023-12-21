import axios from 'axios';

const API_BASE_URL = 'http://localhost:4040'; 

const fetchMCQs = async () => {
  try {
      const response = await axios.get(`${API_BASE_URL}/mcqs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching MCQs:', error);
    throw error;
  }
};

const createMCQ = async (newMCQ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mcqs`, newMCQ);
    return response.data;
  } catch (error) {
    console.error('Error creating MCQ:', error);
    throw error;
  }
};

const updateMCQ = async (mcqId, updatedMCQ) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/mcqs/${mcqId}`, updatedMCQ);
    return response.data;
  } catch (error) {
    console.error(`Error updating MCQ with ID ${mcqId}:`, error);
    throw error;
  }
};

const deleteMCQ = async (mcqId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/mcqs/${mcqId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting MCQ with ID ${mcqId}:`, error);
    throw error;
  }
};

export { fetchMCQs, createMCQ, updateMCQ, deleteMCQ };
