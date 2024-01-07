import { collection, addDoc } from "firebase/firestore";
import { db } from "./../firebase";
import { useState } from "react";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import "./../styles/uploadForm.sass";
import { useNavigate } from "react-router-dom";

interface ImageInfoStructure {
  secure_url: string;
}

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [tripStartDate, setTripStartDate] = useState("");
  const [tripEndDate, setTripEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const [publicId, setPublicId] = useState("");
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const navigate = useNavigate();

  const uwConfig = {
    cloudName,
    uploadPreset
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(title, tripStartDate, description, images);

    try {
      const docRef = await addDoc(collection(db, "travels"), {
        title: title,
        start_date: tripStartDate,
        end_date: tripEndDate,
        text: description,
        images: images,
        main_image: images[0],
      });
      console.log("Document written with ID: ", docRef.id);

      // Reset form fields
      setTitle("");
      setTripStartDate("");
      setTripEndDate("");
      setDescription("");
      setImages([]);
      setPublicId("");

      // Navigate to home page
      navigate('/');

      alert("New trip has been saved successfully!");

    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to save the trip. Please try again.");
    }
  };

  const handleImageUpload = (imageInfo: ImageInfoStructure) => {
    setImages((currentImages) => [...currentImages, imageInfo.secure_url]);
  };

  return (
    <div className="form-container">
      <form className="form">
        <div className="form-item">
          <label>název cesty</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Začátek cesty</label>
          <input
            type="date"
            value={tripStartDate}
            onChange={(e) => setTripStartDate(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Konec cesty</label>
          <input
            type="date"
            value={tripEndDate}
            onChange={(e) => setTripEndDate(e.target.value)}
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
          <label>nahrat fotky</label>
          <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} onImageUpload={handleImageUpload}/>
        </div>
        <div className="form-item">
          <button className="form-btn" onClick={handleSubmit}>
            uložit novou cestu
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
