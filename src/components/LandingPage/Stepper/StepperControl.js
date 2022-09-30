export default function StepperControl({ handleClick, currentStep, steps }) {
  return (
    <div className=" container flex justify-around mt-4 mb-8">
      <button
        onClick={() => handleClick()}
        type="submit"
        className={` bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Back
      </button>
      <button
        onClick={() => handleClick("next")}
        className="bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 "
      >
        {currentStep === steps.length - 1 ? "Cofirm" : "Next"}
      </button>
    </div>
  );
}
