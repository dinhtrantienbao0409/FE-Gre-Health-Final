import { useEffect, useState, useRef } from "react";

export default function Stepper({ steps, currentStep }) {
  const [newStep, setNewStep] = useState([]);
  const stepRef = useRef();
  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          completed: true,
          highlighted: true,
          selected: true,
        };
        count++;
      } else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          completed: true,
          highlighted: true,
          selected: true,
        };
        count++;
      } else {
        newSteps[count] = {
          ...newSteps[count],
          completed: false,
          highlighted: false,
          selected: false,
        };
        count++;
      }
    }
    return newSteps;
  };
  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );
    stepRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? " w-full flex items-center "
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-gray-800">
          <div
            className={`rounded-full transition duration-500 border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
              step.selected
                ? "bg-green-600 text-white font-bold border border-green-600"
                : ""
            }`}
          >
            {/*number */}
            {step.completed ? (
              <span className=" text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
              step.selected ? "text-green-600" : "text-gray-400"
            }`}
          >
            {/*description */}
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ${
            step.completed ? "border-green-600" : "border-gray-300"
          }`}
        >
          {/*line */}
        </div>
      </div>
    );
  });

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
}
