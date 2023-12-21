import React, { useState } from 'react';
import ExamList from './components/ExamList';
import MCQList from './components/MCQList';
import CreateExam from './components/CreateExam';
import CreateMCQ from './components/CreateMCQ';

const App = () => {
  
  return (
    <>
    <div className="container mx-auto p-4 flex text-center">
      <div className="w-3/5 pr-4">
        <ExamList />
      </div>
      <div className="w-2/5">
        <CreateExam />
      </div>     
    </div>
    <hr/>

    <div className="container mx-auto p-4 flex text-center">
      <div className="w-3/5 pr-4">
        <MCQList  />
      </div>
      <div className="w-2/5">
      <CreateMCQ  />
      </div>     
    </div>

   </>
    
  );
};

export default App;



