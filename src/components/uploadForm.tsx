import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./../firebase";
import { useState } from "react";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import "./../styles/uploadForm.sass";
import "./../App.sass"
import { useNavigate } from "react-router-dom";
import { ReactSortable } from 'react-sortablejs';
import emailjs from 'emailjs-com';
import { formatTitleToURL } from "../utils";

interface ImageInfoStructure {
  secure_url: string;
};

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [tripStartDate, setTripStartDate] = useState("");
  const [tripEndDate, setTripEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [mapUrl, setMapUrl] = useState<string>("");

  const [publicId, setPublicId] = useState("");
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const navigate = useNavigate();

  const uwConfig = {
    cloudName,
    uploadPreset
  };

  interface EmailProps {
    userEmail: string;
    userToken: string;
    travelTitle: string;
    travelDescription: string;
    travelImages: string[];
  };

  const titleForUrl = formatTitleToURL(title);

  const sendNotificationEmail = ({ userEmail, userToken, travelTitle, travelDescription, travelImages }: EmailProps): void => {
    const templateParams = {
      to_email: userEmail,
      travel_title: travelTitle,
      travel_description: travelDescription,
      image_first: travelImages[0],
      image_second: travelImages[1],
      image_third: travelImages[2],
      // travel_link: `https://luciecestuje.cz/cesty/${titleForUrl}`,
      travel_link: `http://localhost:5173/cesty/${titleForUrl}`,
      // unsubscribe_link: `https://luciecestuje.cz/odhlasit-odber?token=${userToken}`
      unsubscribe_link: `http://localhost:5173/odhlasit-odber?token=${userToken}`,
    };

    const servisId = import.meta.env.VITE_EMAILJS_SERVIS_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;
    const newTravelTemplateId = import.meta.env.VITE_EMAILJS_NEW_TRAVEL_TEMPLATE_ID;

    emailjs.send(servisId, newTravelTemplateId, templateParams, userId)
      .then((response) => {
        console.log('Notification email sent!', response.status, response.text);
      }, (error) => {
        console.log('Failed to send notification email.', error);
      });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const year = new Date(tripStartDate).getFullYear().toString();

    console.log(title, country, tripStartDate, year, description, images);

    const mainImage = images[0];

    const newImages = images.slice(1);
    console.log(publicId);

    try {

      const subscribersSnapshot = await getDocs(collection(db, 'newsletter_subscribers'));
      subscribersSnapshot.forEach((doc) => {
        sendNotificationEmail({
          userEmail: doc.data().email, 
          userToken: doc.data().token,
          travelTitle: title,
          travelDescription: description,
          travelImages: images
        });
      });

      const docRef = await addDoc(collection(db, "travels"), {
        title,
        country,
        start_date: tripStartDate,
        end_date: tripEndDate,
        text: description,
        main_image: mainImage,
        images: newImages,
        year,
        map_url: mapUrl,
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
      setMapUrl("");

      // Navigate to new travel
      navigate(`/cesty/${titleForUrl}`);

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
          <label>Mapa</label>
          <input
            type="text"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Nahrát fotky</label>
          <CloudinaryUploadWidget
            key={`additional-images-widget`}
            uwConfig={uwConfig}
            setPublicId={setPublicId}
            onImageUpload={handleImageUpload}/>
        </div>
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
        <div className="form-item">
          <button className="form-btn" onClick={handleSubmit}>
            Uložit novou cestu
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default UploadForm;
