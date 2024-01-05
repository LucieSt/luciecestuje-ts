import "./../styles/travel.sass";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./../firebase";
import { collection, getDocs } from "firebase/firestore";

const Travel = () => {
  const [selectedTravelData, setSelectedTravelData] = useState<TravelDataProps | null>(null);

  const { travelId } = useParams();
  
  interface TravelDataProps {
      title: string;
      year: string;
      text: string;
      images: string[];
      main_image: string;
  }

  const displayData = async () => {
    const querySnapshot = await getDocs(collection(db, "travels"));
    // const newData: TravelDataProps[] = querySnapshot.docs.map((doc) => ({
    //   const data = doc.data() as TravelDataProps;
    //     //   console.log(doc);
    //   ...doc.data(),
    // //   id: doc.id,
    // }));

    const newData: TravelDataProps[] = querySnapshot.docs.map((doc) => {
      // Cast the data to TravelDataProps
      const data = doc.data() as TravelDataProps;
      return data;
    });


    const foundTravelData = newData.find((cesta) => cesta.title === travelId);
    setSelectedTravelData(foundTravelData || null);
  };

  useEffect(() => {
    displayData();
  }, []);

//   const handleClick = (e, index) => {
//     console.log(index);
//   };

  const { title, year, text, images, main_image } = selectedTravelData || {};

  const myStyle = { backgroundImage: `url(${main_image})` }

  return (
    <div className="travel">
      {selectedTravelData && (
        <>
          <div className="travel-banner banner" style={myStyle}>
            <div>
              <h2 className='banner-headline'>{title}</h2>
              <p className='banner-subheadline'>{year}</p>
            </div>
          </div>

          <p>{text}</p>

          <ul className="images-container">
            {images?.map((image, index) => {
              return (
                <li>
                  <img
                    key={image}
                    id={index.toString()}
                    src={image}
                    width="100%"
                    // onClick={(e) => handleClick(e, index)}
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
