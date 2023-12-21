import React, { useState } from 'react';
import { fetchExams, createExam, updateExam, deleteExam } from '../services/examService';

const ExamList = ({ exams }) => {
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [exam, setExam] = useState([]);
  const toggleExamDetails = (examId) => {
    setSelectedExamId((prevSelectedExamId) => (prevSelectedExamId === examId ? null : examId));
  };

  const handleEditExam = (examId) => {
    //TODO:: Implement logic for editing an exam
    console.log(`Edit exam with ID ${examId}`);
  };

  const handleDeleteExam = (examId) => {
    //TODO:: Implement logic for deleting an exam
    console.log(`Delete exam with ID ${examId}`);
  };

  useEffect(() => {
    const fetchMCQData = async () => {
        try {
          const mcqData = await fetchMCQs();
          setMCQs(mcqData);
        } catch (error) {
          // Handle error if needed
        }
      };
  
      fetchMCQData();
  
  }, [])

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">Exam List</h1>
      {exams.map((exam) => (
        <div key={exam.id} className="mb-4 bg-white p-6 rounded-lg shadow-md cursor-pointer">
          <div className="flex items-center justify-between" onClick={() => toggleExamDetails(exam.id)}>
            <div className="flex items-center">
              <p className="text-xl font-semibold mr-4">{exam.title}</p>
              {selectedExamId === exam.id && (
                <div className="items-end ">
                <h3>Exam Detail</h3>
                  <span className="text-gray-600"> Duration: {exam.duration} minutes</span>
                  <ul className="mt-2">
                    {exam.mcqs.map((mcq,index) => (
                      <li key={mcq.id} className="text-gray-700"><span className="px-4">{index +1}</span>{mcq.question}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => handleEditExam(exam.id)}
                className="text-blue-500 hover:underline mr-2 focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteExam(exam.id)}
                className="text-red-500 hover:underline focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamList;
