import "./../styles/travel.sass";
import "./../App.sass"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./../firebase";
import { collection, getDocs } from "firebase/firestore";
import { formatTitleToURL, addParamsToImageUrl, formatDate } from "../utils";
import CoolLightbox from "./lightboxComponents/lightboxSetup";
import ReactMarkdown from "react-markdown";

const Travel = () => {

  interface LayoutItem {
    element: string;
    type: string;
  }

  interface TravelDataProps {
    title: string;
    start_date: string;
    end_date: string;
    year: string;
    text: string[];
    images: string; // JSON
    map_url: string | null;
    layout: string; // JSON
    country: string[];
  }

  useEffect(() => {
    displayData();
  }, []);
  
  const [selectedTravelData, setSelectedTravelData] = useState<TravelDataProps | null>(null);
  const { title, start_date, end_date, text, images, map_url, layout, country } = selectedTravelData || {};

  const formatedStartDate = start_date ? formatDate(start_date) : '';
  const formatedEndDate = end_date ? formatDate(end_date) : '';

  const countryString = country?.join(', ');

  const parsedImages = images ? JSON.parse(images) : [];
  const parsedLayout = layout ? JSON.parse(layout) : [];

  interface GalleryState {
    show: boolean;
    index: number;
  }
  
  const [galleries, setGalleries] = useState<GalleryState[]>([]);
    
  const openGallery = (galleryIndex: number, imageIndex: number) => {
    const updatedGalleries = galleries.map((gallery, index) => 
      index === galleryIndex ? { ...gallery, show: true, index: imageIndex } : gallery
    );
    setGalleries(updatedGalleries);
  };

  const closeGallery = (galleryIndex: number) => {
    setGalleries(galleries.map((gallery, index) => 
      index === galleryIndex ? { ...gallery, show: false } : gallery
    ));
  };

  const { travelId } = useParams();

  const displayData = async () => {
    const querySnapshot = await getDocs(collection(db, "travels"));

    const newData: TravelDataProps[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as TravelDataProps;
      return data;
    });

    const foundTravelData = newData.find((cesta) => formatTitleToURL(cesta.title) === travelId);

    if (foundTravelData) {
      const travelImages = foundTravelData.images ? JSON.parse(foundTravelData.images) : [];

      // set image URLs to reduce image size
      const modifiedImages = travelImages.map((group: string[]) => 
        group.map(img => addParamsToImageUrl(img, ""))
      );
  
      setSelectedTravelData({ ...foundTravelData, images: JSON.stringify(modifiedImages) });
      setGalleries(modifiedImages.map(() => ({ show: false, index: 0 })));
    } else {
      setSelectedTravelData(null);
    }

  };

  const main_image = parsedImages?.[0]?.[0];
  const myStyle = { backgroundImage: `url(${main_image})` }

  // setting what element will be shown on the page
  const renderLayoutItem = (item: LayoutItem, index: number) => {
    const elementIndex = parseInt(item.element.replace(/[^\d]/g, '')) - 1;
    switch (item.type) {
      case "Galerie":
        const galleryImages: string[] = parsedImages[elementIndex];
        // const galleryImagesSmaller: string[] = galleryImages.map(image => 
        //   addParamsToImageUrl(image, "q_30/")
        // );
        return (
          <>
            <ul key={index} className="images-container">
              {galleryImages.map((image, imgIndex) => (
                <li key={imgIndex} onClick={() => openGallery(elementIndex, imgIndex)}>
                  <img src={image} alt={`Gallery Image`} />
                </li>
              ))}
            </ul>
            {galleries[elementIndex]?.show && (
              <CoolLightbox 
                images={galleryImages} 
                handleClose={() => closeGallery(elementIndex)} 
                currentImageIndex={galleries[elementIndex].index}
              />
            )}
          </>
        );
      case "Text":
        return (
          <div className="text-container" key={index}>
            <div className="text-content">
              <ReactMarkdown>{text?.[parseInt(item.element.replace('Text ', '')) - 1]}</ReactMarkdown>
            </div>
          </div>
        );
      case "Samostatný obrázek":
        if (parsedImages[elementIndex] && parsedImages[elementIndex].length === 1) {
          const singleImage = parsedImages[elementIndex][0];
          return (
              <div className="travel-banner banner" style={{ backgroundImage: `url(${singleImage})` }} key={index}></div>
          );
      }
      break;
      default:
        return null;
    }
  };

  return (
    <div className="travel">
      {selectedTravelData && (
        <>
          <div className="travel-banner banner" style={myStyle}>
            <div>
              <h2 className='banner-headline'>{title}</h2>
            </div>
          </div>

          <div className="text-container text-container-no-space">
            <div className="text-content">
              <h2>{countryString}</h2>
              <p>{formatedStartDate} - {formatedEndDate}</p>
            </div>
          </div>

          {parsedLayout.map(renderLayoutItem)}
          
          {map_url && <div className="travel-map-container">
            <iframe src={map_url} width="100%" height="100%"></iframe>
          </div>}
        </>
      )}
    </div>
  );
};

export default Travel;