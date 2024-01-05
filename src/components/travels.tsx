import "./../styles/travels.sass";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { db } from "./../firebase";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../authContext";

interface TravelDataProps {
    title: string;
    id: string;
    year: string;
    text: string;
    main_image: string;
}

const Travels = () => {

  const [travelData, setTravelData] = useState<TravelDataProps[]>([]);
  const { signedIn } = useContext(AuthContext);

  const displayData = async () => {
    await getDocs(collection(db, "travels")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data() as TravelDataProps,
        id: doc.id,
      }));
      setTravelData(newData);
    });
  };

  useEffect(() => {
    displayData();
  }, []);

  return (
    <div className="travels">
      <div className="travels-banner banner">
        <div>
          <h2 className='banner-headline'>NAŠE CESTY</h2>
          <p className='banner-subheadline'>PUTOVÁNÍ ZA NOVÝMI ZÁŽITKY</p>
        </div>
      </div>

      <div className="content">

        <div className="travels-list">
          {signedIn && (
            <Link to="/novacesta">
              <div className="travels-link-container">
                <div className="travels-img">
                  <img
                    src="https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1684698763/xhyozoujfrrnzisptc6v.jpg"
                    alt="new"
                    width="100%"
                    height="auto"
                  />
                  <h3>+</h3>
                </div>
              </div>
            </Link>
          )}
          {travelData &&
            travelData.map((cesta) => {
            //   console.log(cesta);
              const url = `/cesty/${cesta.title}`;
              return (
                <Link key={cesta.id} to={url}>
                  <div className="travels-link-container">
                    <div className="travels-img">
                      <img
                        src={cesta.main_image}
                        alt={cesta.title}
                        width="100%"
                        height="auto"
                      />
                      <h3>{cesta.title}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>

    </div>
  );
};

export default Travels;
