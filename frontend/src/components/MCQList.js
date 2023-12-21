import React, { useEffect, useState } from 'react';
import { fetchMCQs, createMCQ, updateMCQ, deleteMCQ } from '../services/mcqService';
const MCQList = () => {
  const [selectedMCQId, setSelectedMCQId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedOptions, setEditedOptions] = useState(['', '', '', '']);
  const [editedCorrectAnswer, setEditedCorrectAnswer] = useState('');
  const [mcqs, setMCQs] = useState([]);
  const toggleMCQDetails = (mcqId) => {
    setSelectedMCQId((prevSelectedMCQId) => (prevSelectedMCQId === mcqId ? null : mcqId));
    setSelectedOptions([]);
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((selectedOption) => selectedOption !== option)
        : [...prevSelectedOptions, option]
    );
  };

  const handleEditMCQ = (mcqId) => {
    const selectedMCQ = mcqs.find((mcq) => mcq.id === mcqId);

    setEditedQuestion(selectedMCQ.question);
    setEditedOptions([...selectedMCQ.options]);

    setEditFormVisible(true);
    setSelectedMCQId(mcqId);
  };

  const handleCancelEdit = () => {
    setEditFormVisible(false);
    setSelectedMCQId(null);
  };
const handleDeleteMCQ = (mcqId)=>{
  // TODO:: handle delete
    console.log("handle it")
}
  const handleSaveEdit = () => {
    // TODO::Implement logic to save the edited MCQ
    console.log('Saved edited MCQ:', {
      id: selectedMCQId,
      question: editedQuestion,
      options: editedOptions,
      correctAnswer: editedCorrectAnswer,
    });

    // Reset state after saving
    setEditFormVisible(false);
    setSelectedMCQId(null);
    setEditedQuestion('');
    setEditedOptions(['', '', '', '']);
  };

  

  const isOptionSelected = (option) => selectedOptions.includes(option);

  const isCorrectOption = (option) => {
    const correctAnswer = mcqs.find((mcq) => mcq.id === selectedMCQId)?.correctAnswer;
    return correctAnswer === option;
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
      <h1 className="text-2xl font-bold mb-4">MCQ List</h1>
      {mcqs.map((mcq) => (
        <div  className="mb-4 bg-white p-6 rounded-lg shadow-md cursor-pointer">
          <div className="flex items-center justify-between" onClick={() => toggleMCQDetails(mcq.id)}>
            <div key={mcq._id}  className="flex items-center">
              <div>
              <p className="text-xl font-semibold mr-4">{mcq.question}</p>
                    {mcq.options.map((option, index) => (
                      <div key={index} className={`flex items-center mr-2 ${
                        isOptionSelected(option)
                          ? isCorrectOption(option)
                            ? 'text-green-600 font-bold'
                            : 'text-red-600'
                          : ''
                      }`}>
                      <input
                        type="checkbox"
                        checked={isOptionSelected(option)}
                        onChange={() => handleOptionChange(option)}
                        className="mr-1"
                      />
                      <span className={`text-gray-700 ${isOptionSelected(option) ? 'font-bold' : ''}`}>
                       {option}
                      </span>
                    </div>
                    ))}

                  



              </div>
              {selectedMCQId === mcq.id && (
                <div>
                 
                  <p className="text-gray-700">Correct Answer: {mcq.correctAnswer}</p>
                </div>
              )}
            </div>
            <div>
              <button
              onClick={() => handleEditMCQ(mcq.id)}
                className="text-blue-500 hover:underline mr-2 focus:outline-none"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMCQ(mcq.id)}
                className="text-red-500 hover:underline focus:outline-none"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex-1">
      {editFormVisible && (
        <div className="mb-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Edit MCQ</h2>
          <div className="mb-4">
            <label htmlFor="editQuestion" className="block text-gray-700 font-bold mb-2">
              Question:
            </label>
            <input
              type="text"
              id="editQuestion"
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Options:</label>
            {editedOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...editedOptions];
                    newOptions[index] = e.target.value;
                    setEditedOptions(newOptions);
                  }}
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  className="w-full border rounded p-2 mr-2"
                />
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="editCorrectAnswer" className="block text-gray-700 font-bold mb-2">
              Correct Answer:
            </label>
            <input
              type="text"
              id="editCorrectAnswer"
              value={editedCorrectAnswer}
              onChange={(e) => setEditedCorrectAnswer(e.target.value)}
              placeholder="Enter correct answer"
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
  );
};

export default MCQList;

