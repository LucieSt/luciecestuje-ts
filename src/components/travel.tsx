import "./../styles/travel.sass";
import "./../App.sass"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./../firebase";
import { collection, getDocs } from "firebase/firestore";
import { formatTitleToURL } from "../utils";
import CoolLightbox from "./lightboxComponents/lightboxSetup";

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
  }
  
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const [selectedTravelData, setSelectedTravelData] = useState<TravelDataProps | null>(null);
  const { title, start_date, end_date, text, images, map_url, layout } = selectedTravelData || {};

  const parsedImages = images ? JSON.parse(images) : [];
  const parsedLayout = layout ? JSON.parse(layout) : [];

  interface GalleryState {
    show: boolean;
    index: number;
  }

  const [galleries, setGalleries] = useState<GalleryState[]>(
    parsedImages.map(() => ({ show: false, index: 0 }))
  );

  console.log("parsed images:",parsedImages);
  console.log("galleries:",galleries);

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

  // const openGallery = (index: number) => {
  //   setCurrentIndex(index);
  //   setShowGallery(true);
  // }

  // const closeGallery = () => {
  //   setShowGallery(false);
  // }

  const { travelId } = useParams();

  const displayData = async () => {
    const querySnapshot = await getDocs(collection(db, "travels"));

    const newData: TravelDataProps[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as TravelDataProps;
      return data;
    });

    const foundTravelData = newData.find((cesta) => formatTitleToURL(cesta.title) === travelId);
    setSelectedTravelData(foundTravelData || null);
  };

  useEffect(() => {
    displayData();
  }, []);

  const main_image = parsedImages?.[0]?.[0];

  const myStyle = { backgroundImage: `url(${main_image})` }

  const renderLayoutItem = (item: LayoutItem, index: number) => {
    const elementIndex = parseInt(item.element.replace(/[^\d]/g, '')) - 1;
    switch (item.type) {
      case "Galerie":
        const galleryImages: string[] = parsedImages[elementIndex]; // This is an array of image URLs
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
              <p>{text?.[parseInt(item.element.replace('Text ', '')) - 1]}</p>
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
              <p className='banner-subheadline'>{start_date} - {end_date}</p>
            </div>
          </div>

          {parsedLayout.map(renderLayoutItem)}

          {/* <div className="text-container">
            <div className="text-content">
              <p>{text}</p>
            </div>
          </div> */}

          {/* <ul className="images-container">
            {images?.map((image, index) => {
              return (
                <li key={index}>
                  <img
                    id={index.toString()}
                    src={image}
                    width="100%"
                    alt={image}
                    onClick={() => openGallery(index)}
                  ></img>
                </li>
              );
            })}
          </ul> */}

          {/* {showGallery && (
            <CoolLightbox images={images || []}  handleClose={closeGallery} currentImageIndex={currentIndex}/>
          )} */}
          
          {map_url && <div className="travel-map-container">
            <iframe src={map_url} width="100%" height="480"></iframe>
          </div>}
        </>
      )}
    </div>
  );
};

export default Travel;