import React,{useState} from 'react';
import { useData } from '../DataContext';
const CreateMCQ = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [newMCQData, setNewMCQData] = useState({ question: '', options: [], correctAnswer: '',exam:'' });
  const { createMCQcxt } = useData();

  const handleCreateMCQ = async () => {
    setFormVisible(!formVisible);
    try {
      const optionsArray = newMCQData.options.split(',').map(option => option.trim());
      const newMCQ = { ...newMCQData, options: optionsArray };
      await createMCQcxt(newMCQ);
      setNewMCQData({ question: '', options: [], correctAnswer: '' });
    } catch (error) {
      console.log(error)
    }
  };
  const handleCancelEdit = () => {
    setFormVisible(false);
    
  };
  const onCreateClicked = ()=>{
    setFormVisible(!formVisible)
  }
  return (
    <div className="mt-8 p-6 bg-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create MCQ</h1>
      <div className="flex-1">
            {formVisible &&(
              <div className="mb-4 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Edit MCQ</h2>
                <div className="mb-4">
                  <label htmlFor="question" className="block text-gray-700 font-bold mb-2">
                    Question:
                  </label>
                  <input
                    type="text"
                    id="question"
                    value={newMCQData.question}
                    onChange={(e) => setNewMCQData({ ...newMCQData, question: e.target.value })}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="options" className="block text-gray-700 font-bold mb-2">
                    Options:
                  </label>
                  <input
                    type="text"
                    id="options"
                    placeholder="Options comma separated"
                    value={newMCQData.options}
                    onChange={(e) => setNewMCQData({ ...newMCQData, options: e.target.value })}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="correctAnswer" className="block text-gray-700 font-bold mb-2">
                    correctAnswer:
                  </label>
                  <input
                    type="text"
                    id="correctAnswer"
                    value={newMCQData.correctAnswer}
                    onChange={(e) => setNewMCQData({ ...newMCQData, correctAnswer: e.target.value })}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="examID" className="block text-gray-700 font-bold mb-2">
                    examID:
                  </label>
                  <input
                    type="text"
                    id="examID"
                    value={newMCQData.exam}
                    onChange={(e) => setNewMCQData({ ...newMCQData, exam: e.target.value })}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mt-4">
                  <button onClick={handleCreateMCQ} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          {!formVisible &&(
              <button onClick={onCreateClicked} className="bg-blue-500 text-white px-4 py-2 rounded">Create MCQ</button>
          )}
    </div>
  );
};

export default CreateMCQ;
