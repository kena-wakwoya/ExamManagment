import axios from 'axios';

const API_BASE_URL = 'http://localhost:4040'; 

const fetchExams = async () => {
  try {
      const response = await axios.get(`${API_BASE_URL}/exams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Exams:', error);
    throw error;
  }
};

const createExam = async (newExam) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/exams`, newExam);
    return response.data;
  } catch (error) {
    console.error('Error creating Exam:', error);
    throw error;
  }
};

const updateExam = async (ExamId, updatedExam) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/exams/${ExamId}`, updatedExam);
    return response.data;
  } catch (error) {
    console.error(`Error updating Exam with ID ${ExamId}:`, error);
    throw error;
  }
};

const deleteExam = async (ExamId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/exams/${ExamId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting Exam with ID ${ExamId}:`, error);
    throw error;
  }
};

export { fetchExams, createExam, updateExam, deleteExam };
