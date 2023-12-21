import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMCQs, createMCQ, updateMCQ, deleteMCQ } from './services/mcqService';
import { fetchExams, createExam, updateExam, deleteExam } from './services/examService';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [mcqs, setMCQs] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mcqData = await fetchMCQs();
        setMCQs(mcqData);

        const examData = await fetchExams();
        setExams(examData);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

const createMCQcxt = async (mcqData) => {
    try {
      const newMCQ = await createMCQ(mcqData);
      setMCQs((prevMCQs) => [...prevMCQs, newMCQ]);
    } catch (error) {
     console.log(error);
    }
  };

  const updateMCQcxt = async (mcqId, updatedData) => {
    try {
      const updatedMCQ = await updateMCQ(mcqId, updatedData);
      setMCQs((prevMCQs) =>
        prevMCQs.map((mcq) => (mcq._id === mcqId ? updatedMCQ : mcq))
      );
    } catch (error) {
      console.log(error)
    }
  };

  const deleteMCQcxt = async (mcqId) => {
    try {
      await deleteMCQ(mcqId);
      setMCQs((prevMCQs) => prevMCQs.filter((mcq) => mcq._id !== mcqId));
    } catch (error) {
      console.log(error)
    }
  };

  const createExamcxt = async (examData) => {
    try {
      const newExam = await createExam(examData);
      setExams((prevExams) => [...prevExams, newExam]);
    } catch (error) {
      console.log(error)
    }
  };

  const updateExamcxt = async (examId, updatedData) => {
    try {
      const updatedExam = await updateExam(examId, updatedData);
      setExams((prevExams) =>
        prevExams.map((exam) => (exam._id === examId ? updatedExam : exam))
      );
    } catch (error) {
      console.log(error)
    }
  };

  const deleteExamcxt = async (examId) => {
    try {
      await deleteExam(examId);
      setExams((prevExams) => prevExams.filter((exam) => exam._id !== examId));
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <DataContext.Provider
      value={{
        mcqs,
        exams,
        createMCQcxt,
        updateMCQcxt,
        deleteMCQcxt,
        createExamcxt,
        updateExamcxt,
        deleteExamcxt,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
