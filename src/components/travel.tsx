import "./../styles/travel.sass";
import "./../App.sass"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./../firebase";
import { collection, getDocs } from "firebase/firestore";
import { formatTitleToURL } from "../utils";

const Travel = () => {

  interface TravelDataProps {
    title: string;
    start_date: string;
    end_date: string;
    year: string;
    text: string;
    images: string[];
    main_image: string;
  }

  const [selectedTravelData, setSelectedTravelData] = useState<TravelDataProps | null>(null);

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

  const { title, start_date, end_date, text, images, main_image } = selectedTravelData || {};

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

          <p>{text}</p>

          <ul className="images-container">
            {images?.map((image, index) => {
              return (
                <li>
                  <img
                    key={index.toString()}
                    id={index.toString()}
                    src={image}
                    width="100%"
                    alt={image}
                  ></img>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Travel;
