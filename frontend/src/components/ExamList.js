import React, { useState } from 'react';
import { useData } from '../DataContext';
 
const ExamList = () => {
  const [selectedExamId, setSelectedExamId] = useState(null);
  const {exams, updateExamcxt,deleteExamcxt} = useData();
  const [title,setTitle] = useState(null);
  const [duration,setDuration] = useState(null);
  const [mcqs,setMCQs] = useState([]);
  const [formVisibleId, setFormVisibleId] = useState(null);
  const [formVisible,setFormVisible] = useState(false);
  const toggleExamDetails = (examId) => {
    setSelectedExamId((prevSelectedExamId) => (prevSelectedExamId === examId ? null : examId));
  };

  const handleEditExam = (examId) => {
    const setSelectedExam = exams.find((exam) => exam._id === examId);
    setTitle(setSelectedExam.title);
    setDuration(setSelectedExam.duration);
    setMCQs([...setSelectedExam.mcqs]);
    setFormVisible(!formVisible);
    setFormVisibleId(examId);
    setSelectedExamId(examId);
    
  };

  const handleDeleteExam = (examId) => {
    const setSelectedExam = exams.find((exam) => exam._id === examId);
    if(setSelectedExam.mcqs.length ==0){
      deleteExamcxt(examId)
    }
    else{
      console.log("exam id used as foreign key in one of the mcqs")
    }
  };


  const handleCancelEdit = () => {
    setFormVisible(false);
    setSelectedExamId(null);
  };
  
  const handleSaveEdit = () => {
    const data= {
      id: selectedExamId,
      title: title,
      duration: duration,
      mcqs: mcqs,
    };

    updateExamcxt(selectedExamId,data)
    console.log('Saved edited EXam:', {
      id: selectedExamId,
      title: title,
      duration: duration,
      mcqs: mcqs,
    });

    // Reset state after saving
    setFormVisible(false);
    setSelectedExamId(null);
    setTitle('');
    setMCQs(['', '', '', '']);
    setDuration(null)
  };


  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">Exam List</h1>
      {exams.map((exam,index) => (
        <div key={exam.id} className="mb-4 bg-white p-6 rounded-lg shadow-md cursor-pointer">
          <div className="flex items-center justify-between">
          <div  onClick={() => toggleExamDetails(exam._id)}>
            <div className="items-center">
              <p className="text-xl font-semibold mr-4">{exam.title}</p>
              {selectedExamId === exam._id && (
                <div className="items-end ">
                <h3>Exam Detail</h3>
                <h3 className="text-gray-600"> Duration: {exam.duration} minutes</h3>
                  <h3 className="text-gray-600"> Number of Questions: {exam.mcqs.length} </h3>                  
                </div>
              )}
            </div>            
          </div>
          <div>
              <button
                onClick={() => handleEditExam(exam._id)}
                className="text-blue-500 hover:underline mr-2 focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteExam(exam._id)}
                className="text-red-500 hover:underline focus:outline-none"
              >
                Delete
              </button>
            </div>           
          </div>
          <div className="flex-1">
            {formVisible && formVisibleId===exam._id&&(
              <div className="mb-4 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Edit Exam</h2>
                <div className="mb-4">
                  <label htmlFor="exam title" className="block text-gray-700 font-bold mb-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="exam duration" className="block text-gray-700 font-bold mb-2">
                    Duration:
                  </label>
                  <input
                    type="text"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mcqs" className="block text-gray-700 font-bold mb-2">
                    Mcqs:
                  </label>
                  <input
                    type="text"
                    id="mcqs"
                    value={mcqs}
                    onChange={(e) => setMCQs(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mt-4">
                  <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamList;
