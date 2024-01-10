import { collection, addDoc } from "firebase/firestore";
import { db } from "./../firebase";
import { useState } from "react";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import "./../styles/uploadForm.sass";
import "./../App.sass"
import { useNavigate } from "react-router-dom";
import { ReactSortable } from 'react-sortablejs';

interface ImageInfoStructure {
  secure_url: string;
}

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
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
    const year = new Date(tripStartDate).getFullYear().toString();

    console.log(title, country, tripStartDate, year, description, images);

    try {
      const docRef = await addDoc(collection(db, "travels"), {
        title,
        country,
        start_date: tripStartDate,
        end_date: tripEndDate,
        text: description,
        images,
        main_image: images[0],
        year,
      });
      console.log("Document written with ID: ", docRef.id);

      // Reset form fields
      setTitle("");
      setCountry("");
      setTripStartDate("");
      setTripEndDate("");
      setDescription("");
      setImages([]);
      setPublicId("");

      // Navigate to travels
      navigate('/cesty');

      alert("New trip has been saved successfully!");

    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to save the trip. Please try again.");
    }
  };

  const handleImageUpload = (imageInfo: ImageInfoStructure) => {
    setImages((currentImages) => [...currentImages, imageInfo.secure_url]);
  };

  const handleDeleteImage = async (index: number) => {
    setImages(images.filter((_, imgIndex) => imgIndex !== index));
  };

  interface SortableItem {
    id: string;
    src: string;
  }

  const onDragEnd = (items: SortableItem[]) => {
    setImages(items.map(item => item.src)); // Mapping back to string array
  };

  return (
    <div className="form-container">
      <form className="form">
        <div className="form-item">
          <label>Název cesty</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Země</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
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
          <label>Popis</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-item">
          <label>Nahrát fotky</label>
          <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} onImageUpload={handleImageUpload}/>
        </div>
        <div className="form-item">
          <button className="form-btn" onClick={handleSubmit}>
            Uložit novou cestu
          </button>
        </div>
      </form>

      <div>
        <br />
        <h2>preview:</h2>

        <ReactSortable
          list={images.map((src, index) => ({ id: index.toString(), src }))}
          setList={onDragEnd}
          className="images-container preview-images-container"
        >
          {images.map((image, index) => (
            <li className="images-item" key={index}>
              <img
                src={image}
                alt={`Image ${index}`}
                width="100%"
              />
              <button onClick={() => handleDeleteImage(index)}>X</button>
            </li>
          ))}
        </ReactSortable>

      </div>
    </div>
  );
};

export default UploadForm;
