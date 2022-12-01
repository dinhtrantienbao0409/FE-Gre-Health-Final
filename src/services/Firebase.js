import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
export const uploadImage = async (file) => {
  console.log("🚀 ~ file: Firebase.js:4 ~ uploadImage ~ file", file.name);
  try {
    if (!file) return null;
    const storageRef = ref(storage, `form/${file.name}`);

    console.log(
      "🚀 ~ file: Firebase.js:9 ~ uploadImage ~ storageRef",
      storageRef
    );
    // uploadBytes(storageRef, file).then((snapshot) => {
    //   getDownloadURL(snapshot.ref).then((downloadURL) => {
    //     setUrl(downloadURL);
    //   });
    // });
    const uploadTask = uploadBytes(storageRef, file);
    // download url
    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
      console.log(url);
    });
  } catch (error) {
    return error;
  }
};
