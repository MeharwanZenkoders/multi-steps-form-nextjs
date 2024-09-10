import React from 'react'
const ProgressBar = ({ step }: { step: number }) => {
    const totalSteps = 5; 
    const progressBars = Array.from({ length: totalSteps }, (_, index) => index + 1);
  
    return (
      <div className="flex justify-end p-2">
        <div className="flex gap-2">
          {progressBars.map((steps) => (
            <div
              key={steps}
              className={`h-2 rounded-lg transition-all ${
                steps === step ? 'w-12 bg-black' : 'w-6 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };
  export default ProgressBar;
