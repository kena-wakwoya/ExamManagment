import React,{useState} from 'react';
import { useData } from '../DataContext';

const CreateExam = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [newExamData, setNewExamData] = useState({ title: '', mcqs: [], duration: 0 });
  const { createExamcxt } = useData();

  const handleCreateExam = async () => {
    setFormVisible(!formVisible);
    let mcqsArray = [];
    try {
      if(newExamData.mcqs.length !=0){
         mcqsArray = newExamData.mcqs.split(',').map(mcq => mcq.trim());
        
      }
      const newExam = { ...newExamData, mcqs: mcqsArray };
      await createExamcxt(newExam);
      setNewExamData({ title: '', mcqs: [], duration: 0 });
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
      <h1 className="text-2xl font-bold mb-4">Create Exam</h1>
      <div className="flex-1">
            {formVisible &&(
              <div className="mb-4 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Create New Exam</h2>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newExamData.title}
                    onChange={(e) => setNewExamData({ ...newExamData, title: e.target.value })}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="duration" className="block text-gray-700 font-bold mb-2">
                    Duration:
                  </label>
                  <input
                    type="text"
                    id="duration"
                    placeholder="Time duration in Minutes"
                    value={newExamData.duration}
                    onChange={(e) => setNewExamData({ ...newExamData, duration: e.target.value })}
                    className="w-full border rounded p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mcqs" className="block text-gray-700 font-bold mb-2">
                    MCQs:
                  </label>
                  <input
                    type="text"
                    id="mcqs"
                    value={newExamData.mcqs}
                    onChange={(e) => setNewExamData({ ...newExamData, mcqs: e.target.value })}
                    className="w-full border rounded p-2"
                  />
                </div>
                
                <div className="mt-4">
                  <button onClick={handleCreateExam} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
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
               <button onClick={onCreateClicked} className="bg-blue-500 text-white px-4 py-2 rounded">Create Exam</button>
          )}
    </div>
  );
};

export default CreateExam;
