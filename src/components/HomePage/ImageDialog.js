import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFirebaseImage,
  setFirebaseImage,
} from "slice/authSlice/imageSlice";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

export default function ImageDialog({ onDialog }) {
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const imageUrl = useSelector((state) => state.firebaseImage.url);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleCancel = () => {
    dispatch(removeFirebaseImage(imageUrl));
  };
  const handleUploadImage = async () => {
    try {
      if (!file) {
        alert("Please upload an image first!");
      }
      const storageRef = ref(storage, `/files/${file.name}`);

      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          dispatch(setFirebaseImage(url));
        });
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: ImageDialog.js:32 ~ handleUploadImage ~ error",
        error
      );
    }
  };

  return (
    <div
      className="fixed bg-gray-900 top-0 left-0 right-0 bottom-0 bg-opacity-50 transition-opacity"
      // onClick={() => onDialog(false)}
    >
      <div
        className="absolute flex flex-col items-center top-1/3 left-1/3  p-10 rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {!imageUrl ? (
          <div className="flex flex-col jusify-center item-center">
            <div className="w-full flex flex-col  my-4">
              <label
                className="flex item-start text-sm font-bold text-gray-600"
                htmlFor="date-of-birth"
              >
                Choose image file
              </label>
              <input
                id="url"
                type="file"
                accept="/image/*"
                onChange={handleChange}
                className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="w-full px-4 py-3">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center cursor-pointer rounded-md bg-gray-500 border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => onDialog(false)}
              >
                Cancel
              </button>
              {!file ? (
                <button
                  disabled
                  type="button"
                  className="inline-flex w-full justify-center cursor-pointer rounded-md bg-red-200 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add image
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex w-full justify-center cursor-pointer rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUploadImage}
                >
                  Add image
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full flex flex-col item-start my-4">
              <label
                className="flex item-start text-sm font-bold text-gray-600"
                htmlFor="date-of-birth"
              >
                Choose image file
              </label>
              <input
                id="url"
                type="file"
                accept="/image/*"
                onChange={handleChange}
                disabled
                className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="w-full px-4 py-3 ">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center cursor-pointer rounded-md bg-gray-400 border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  onDialog(false);
                  handleCancel();
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center cursor-pointer rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  onDialog(true);
                }}
              >
                Save image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
