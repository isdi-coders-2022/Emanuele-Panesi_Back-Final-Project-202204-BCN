const fs = require("fs");
const path = require("path");
const { initializeApp } = require("firebase/app");
const {
  uploadBytes,
  ref,
  getDownloadURL,
  getStorage,
} = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyBV4Q6T-zM9b27LSU0g6N9eZ_jsxIQ7G4s",
  authDomain: "recordswapp-e0444.firebaseapp.com",
  projectId: "recordswapp-e0444",
  storageBucket: "recordswapp-e0444.appspot.com",
  messagingSenderId: "278703235740",
  appId: "1:278703235740:web:5e56c5a900623921ba0359",
};

const firebaseApp = initializeApp(firebaseConfig);

const imageConverter = async (req, res, next) => {
  const { file } = req;

  let firebaseFileURL;

  if (file) {
    const newImageName = file ? `${Date.now()}${file.originalname}` : "";
    await fs.rename(
      path.join("uploads", "pizzerias", file.filename),
      path.join("uploads", "pizzerias", newImageName),
      async (error) => {
        if (error) {
          next(error);
          return;
        }

        await fs.readFile(
          path.join("uploads", "pizzerias", newImageName),
          async (readError, readFile) => {
            if (readError) {
              next(readError);
              return;
            }
            const storage = getStorage(firebaseApp);

            const storageRef = ref(storage, newImageName);

            const metadata = {
              contentType: "image",
            };

            await uploadBytes(storageRef, readFile, metadata);
            firebaseFileURL = await getDownloadURL(storageRef);

            req.newImageName = newImageName;
            req.firebaseFileURL = firebaseFileURL;

            if (firebaseFileURL) {
              next();
            }
          }
        );
      }
    );
    if (firebaseFileURL) {
      next();
    }
  } else {
    next();
  }
};

module.exports = imageConverter;
