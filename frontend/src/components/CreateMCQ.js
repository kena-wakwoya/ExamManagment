import React from 'react';

const CreateMCQ = ({ onCreateMCQ }) => {
  return (
    <div className="mt-8 p-6 bg-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create MCQ</h1>
      {/* TODO:: Form Goes here */}
      <button onClick={onCreateMCQ} className="bg-blue-500 text-white px-4 py-2 rounded">Create MCQ</button>
    </div>
  );
};

export default CreateMCQ;
