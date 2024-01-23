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

interface LayoutAssignment {
  type: string;
  element: string;
}

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [tripStartDate, setTripStartDate] = useState("");
  const [tripEndDate, setTripEndDate] = useState("");
  const [mapUrl, setMapUrl] = useState<string>("");

  const [publicId, setPublicId] = useState("");

  const [errorMessageTitle, setErrorMessageTitle] = useState("");

  const [descriptions, setDescriptions] = useState<string[]>([""]);
  
  const [imageGroups, setImageGroups] = useState<string[][]>([[]]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);

  const [layoutElements, setLayoutElements] = useState<string[]>(["Text 1", "Skupina fotek 1"]);

  const [layoutAssignments, setLayoutAssignments] = useState<LayoutAssignment[]>([]);

  const layoutTypes = ["Hlavní fotka", "Galerie", "Text", "Samostatný obrázek"];

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
    const removeMarkdownBold = (text: string) => text.replace(/\*\*(.*?)\*\*/g, '$1');
    const shortDescription = travelDescription.length > 100 ? travelDescription.slice(0, 500) + "..." : travelDescription;
    const cleanedDescription = removeMarkdownBold(shortDescription);

    const templateParams = {
      to_email: userEmail,
      travel_title: travelTitle,
      travel_description: cleanedDescription,
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
    
    // control of unique title
    setErrorMessageTitle("");
    const querySnapshot = await getDocs(collection(db, "travels"));
    const isDuplicate = querySnapshot.docs.some(
      (doc) => formatTitleToURL(doc.data().title) === formatTitleToURL(title)
    );
    if (isDuplicate) {
      setErrorMessageTitle("Cesta s tímto názvem již existuje.");
      return;
    }

    const year = new Date(tripStartDate).getFullYear().toString();

    console.log(title, country, tripStartDate, year, descriptions, imageGroups);

    console.log(publicId);

    const countriesArray = country.split(',').map(c => c.trim());

    const serializedImageGroups = JSON.stringify(imageGroups);
    const serializedLayoutAssignments = JSON.stringify(layoutAssignments);

    try {

      const subscribersSnapshot = await getDocs(collection(db, 'newsletter_subscribers'));
      const combinedImages = imageGroups.reduce((acc, group) => acc.concat(group), []);
      subscribersSnapshot.forEach((doc) => {
        sendNotificationEmail({
          userEmail: doc.data().email, 
          userToken: doc.data().token,
          travelTitle: title,
          travelDescription: descriptions[0],
          travelImages: combinedImages
        });
      });

      const docRef = await addDoc(collection(db, "travels"), {
        title,
        country: countriesArray,
        start_date: tripStartDate,
        end_date: tripEndDate,
        text: descriptions,
        images: serializedImageGroups,
        year,
        map_url: mapUrl,
        layout: serializedLayoutAssignments,
      });
      console.log("Document written with ID: ", docRef.id);

      // Reset form fields
      setTitle("");
      setCountry("");
      setTripStartDate("");
      setTripEndDate("");
      setDescriptions([]);
      setImageGroups([[]]);
      setPublicId("");
      setMapUrl("");
      setLayoutAssignments([]);

      // Navigate to new travel
      navigate(`/cesty/${titleForUrl}`);

      alert("New trip has been saved successfully!");

    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to save the trip. Please try again.");
    }
  };

  const handleLayoutTypeChange = (index: number, type: string) => {
    const newAssignments = [...layoutAssignments];
    newAssignments[index] = { ...newAssignments[index], type };
    setLayoutAssignments(newAssignments);
  };

  const handleElementChange = (index: number, element: string) => {
    const newAssignments = [...layoutAssignments];
    newAssignments[index] = { ...newAssignments[index], element };
    setLayoutAssignments(newAssignments);
  };

  const handleAddTextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const newTexts = [...descriptions, ""];
    setDescriptions(newTexts);
    setLayoutElements([...layoutElements, `Text ${newTexts.length}`]);
  };

  const handleRemoveTextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault();
    const updatedDescriptions = descriptions.filter((_, idx) => idx !== index);
    setDescriptions(updatedDescriptions);
    const highestTextElement = layoutElements
      .filter(el => el.startsWith('Text '))
      .sort()
      .pop();
    setLayoutElements(layoutElements.filter(el => el !== highestTextElement));
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescriptions = descriptions.map((desc, i) => {
      if (i === index) {
        return value;
      }
      return desc;
    });
    setDescriptions(newDescriptions);
  };

  //images new way:
  const handleAddImageGroup = () => {
    const newImageGroups = [...imageGroups, []];
    setImageGroups(newImageGroups);
    setLayoutElements([...layoutElements, `Skupina fotek ${newImageGroups.length}`]);
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedIndex = parseInt(e.target.value);
    console.log("Selected group index changed to:", newSelectedIndex);
    setSelectedGroupIndex(newSelectedIndex);
  }

  const handleRemoveImageGroup = (groupIndex: number) => {
    const updatedImageGroups = imageGroups.filter((_, index) => index !== groupIndex);
    setImageGroups(updatedImageGroups);
    const highestGroupElement = layoutElements
      .filter(el => el.startsWith('Skupina fotek '))
      .sort()
      .pop();
    setLayoutElements(layoutElements.filter(el => el !== highestGroupElement));
  };

  const handleImageUpload = (imageInfo: ImageInfoStructure) => {
    const imageUrl = imageInfo.secure_url; // Extract the URL from the image info
    console.log("Before update:", imageGroups, "Selected group:", selectedGroupIndex, "New image:", imageUrl);
  
    // Update the imageGroups state
    setSelectedGroupIndex(prevSelectedGroupIndex => {
      setImageGroups(previousGroups => {        
        // Clone the previousGroups to avoid direct state mutation
        const updatedGroups = [...previousGroups];
    
        // Add the new image URL to the selected group, ensuring not to overwrite existing images
        if (updatedGroups[prevSelectedGroupIndex]) {
          updatedGroups[prevSelectedGroupIndex] = [...updatedGroups[prevSelectedGroupIndex], imageUrl];
        } else {
          updatedGroups[prevSelectedGroupIndex] = [imageUrl];
        }
    
        console.log("After update:", updatedGroups);
        return updatedGroups;
      });
      return prevSelectedGroupIndex;
    })

  };

  const handleImageGroupSort = (newList: { id: string; src: string; }[], groupIndex: number) => {
    const updatedImageGroups = imageGroups.map((group, index) => {
      if (index === groupIndex) {
        // Extract only the 'src' property from each item in the newList
        return newList.map(item => item.src);
      }
      return group;
    });
  
    setImageGroups(updatedImageGroups);
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageIndex: number, groupIndex: number) => {
    e.preventDefault();
  
    // Update the specific group by filtering out the image at the specified index
    const updatedGroup = imageGroups[groupIndex].filter((_, idx) => idx !== imageIndex);
  
    // Update the entire imageGroups array with the modified group
    const updatedImageGroups = imageGroups.map((group, idx) => {
      if (idx === groupIndex) {
        return updatedGroup;
      }
      return group;
    });
  
    setImageGroups(updatedImageGroups);
  };

  return (
    <div className="form-container">
      <form className="form">

        <h2 className="form-header">Základní údaje</h2>

        <div className="form-item">
          <label className={ errorMessageTitle ? "form-error" : "" }>Název cesty</label>
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
          <label>Mapa</label>
          <input
            type="text"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
          />
        </div>

        <h2 className="form-header">Texty</h2>

        {descriptions.map((description, index) => (
          <div className="form-item" key={index}>
            <label>Text {index + 1}</label>
            <textarea
              value={description}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
            ></textarea>
            <button type="button" onClick={(e) => handleRemoveTextClick(e, index)}>X</button>
          </div>
        ))}

        <button onClick={(e) => handleAddTextClick(e)}>Přidat text</button>

        <h2 className="form-header">Fotky</h2>

        {/* Select Image Group */}
        <div className="form-item">
          <label>Vybrat skupinu obrázků:</label>
          <select onChange={handleGroupChange}>
            {imageGroups.map((_, index) => (
              <option value={index} key={index}>
                Skupina {index + 1}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddImageGroup}>Přidat novou skupinu</button>
        </div>

        {/* Single Cloudinary Upload Widget */}
        <div className="form-item" onClick={() => {
          console.log('novy log:',selectedGroupIndex, imageGroups);
        }}>
          <label>Nahrát fotky</label>
          <CloudinaryUploadWidget
            uwConfig={uwConfig}
            setPublicId={setPublicId}
            onImageUpload={handleImageUpload}
          />
        </div>

        {/* Preview and Remove Image Groups */}
        {imageGroups.map((groupImages, groupIndex) => (
          <div key={groupIndex}>
            <h2 className="form-header">Preview skupiny {groupIndex + 1}:</h2>
            <ReactSortable
              list={groupImages.map((src, index) => ({ id: index.toString(), src }))}
              setList={(newList) => handleImageGroupSort(newList.map(item => item), groupIndex)}
              className="images-container preview-images-container"
            >
              {groupImages.map((image, index) => (
                <li className="images-item" key={index}>
                  <img src={image} alt={`Image ${index}`} width="100%" />
                  <button onClick={(e) => handleRemoveImage(e, index, groupIndex)}>X</button>
                </li>
              ))}
            </ReactSortable>
            <button type="button" onClick={() => handleRemoveImageGroup(groupIndex)}>Odstranit skupinu {groupIndex + 1}</button>
          </div>
        ))}

        <h2 className="form-header">Seřazení prvků</h2>

        {layoutElements.map((element, index) => (
          <div key={index}>
            <select value={layoutAssignments[index]?.type || ''} onChange={e => handleLayoutTypeChange(index, e.target.value)}>
            <option value="" disabled> --- </option>
              {layoutTypes.map((type, typeIndex) => (
                <option key={typeIndex} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select value={layoutAssignments[index]?.element || ''} onChange={e => handleElementChange(index, e.target.value)}>
              <option value="" disabled> --- </option>
              {layoutElements.map((el, elIndex) => (
                <option key={elIndex} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
        ))}

        <h2 className="form-header" onClick={() => {console.log(layoutAssignments)}}>Uložit a poslat newsletter</h2>

        <div className="form-item">
          <button className="form-btn" onClick={handleSubmit}>
            Uložit novou cestu
          </button>
        </div>

        {errorMessageTitle && <div className="form-item">
          <p className="form-error">{errorMessageTitle}</p>
        </div>}

      </form>
      
    </div>
  );
};

export default UploadForm;
