import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Dialog({ message, onDialog }) {
  return (
    <div
      className="fixed bg-gray-900 top-0 left-0 right-0 bottom-0 bg-opacity-50 transition-opacity"
      onClick={() => onDialog(false)}
    >
      <div
        className="absolute flex flex-col items-center top-1/3 left-1/3  p-10 rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <ExclamationTriangleIcon
            className="h-20 w-20 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-2">
          <p className="text-md font-semibold text-gray-500">{message}</p>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center cursor-pointer rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => onDialog(true)}
          >
            Logout
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => onDialog(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
