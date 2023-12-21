import React from 'react';

const CreateExam = ({ onCreateExam }) => {
  return (
    <div className="mt-8 p-6 bg-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Exam</h1>
      {/* TODO:: form goes here */}
      <button onClick={onCreateExam} className="bg-blue-500 text-white px-4 py-2 rounded">Create Exam</button>
    </div>
  );
};

export default CreateExam;
