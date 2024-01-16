import "./../styles/travel.sass";
import "./../App.sass"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./../firebase";
import { collection, getDocs } from "firebase/firestore";
import { formatTitleToURL } from "../utils";
import Lightbox, { ImagesListType } from 'react-spring-lightbox';

const Travel = () => {

  interface TravelDataProps {
    title: string;
    start_date: string;
    end_date: string;
    year: string;
    text: string;
    images: string[];
    main_image: string;
    map_url: string | null;
  }

  const [selectedTravelData, setSelectedTravelData] = useState<TravelDataProps | null>(null);

  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setShowGallery(true);
  }

  const closeGallery = () => {
    setShowGallery(false);
  }

  const gotoPrevious = () =>
    currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  const gotoNext = () =>
    currentIndex + 1 < (images||[]).length &&
    setCurrentIndex(currentIndex + 1);

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

  const { title, start_date, end_date, text, images, main_image, map_url } = selectedTravelData || {};

  const imagesList: ImagesListType = (images||[]).map((image, index) => ({
    src: image,
    loading: 'lazy',
    alt: `Image ${index + 1}`,
  }));

  const myStyle = { backgroundImage: `url(${main_image})` }

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

          <div className="text-container">
            <div className="text-content">
              <p>{text}</p>
            </div>
          </div>

          <ul className="images-container">
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
          </ul>

          {showGallery && (
            <Lightbox
              isOpen={true}
              onPrev={gotoPrevious}
              onNext={gotoNext}
              images={imagesList}
              currentIndex={currentIndex}
              onClose={closeGallery}
              style={{ background: "rgba(0,0,0, 0.9)" }}
            />
          )}      
          
          {map_url && <div className="travel-map-container">
            <iframe src={map_url} width="100%" height="480"></iframe>
          </div>}
        </>
      )}
    </div>
  );
};

export default Travel;