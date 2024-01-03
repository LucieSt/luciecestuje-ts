import { collection, addDoc } from "firebase/firestore";
import { db } from "./../firebase";
import { useState } from "react";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget2";
import "./../styles/uploadForm.sass";

interface ImageInfoStructure {
  secure_url: string;
}

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [publicId, setPublicId] = useState("");
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const uwConfig = {
    cloudName,
    uploadPreset
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(title, description, images);

    try {
      const docRef = await addDoc(collection(db, "travels"), {
        title: title,
        text: description,
        images: images,
        main_image: images[0],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleImageUpload = (imageInfo: ImageInfoStructure) => {
    setImages((currentImages) => [...currentImages, imageInfo.secure_url]);
  };

  return (
    <div className="form-container">
      <form className="form">
        <div className="form-item">
          <label>nazev cesty</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>popis</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-item">
          {/* <label>nahrat fotky</label>
          <CloudinaryUploadWidget onImageUpload={handleImageUpload} /> */}
          <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} onImageUpload={handleImageUpload}/>
        </div>
        <div className="form-item">
          <button className="form-btn" onClick={handleSubmit}>
            ulozit novou cestu
          </button>
        </div>
      </form>

      <div>
        <h2>preview:</h2>
      </div>
    </div>
  );
};

export default UploadForm;
