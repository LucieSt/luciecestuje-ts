import "./../styles/travels.sass";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { db } from "./../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../authContext";
import { formatTitleToURL } from "../utils";
import TravelsFilter from "./travelsFilter";

interface TravelDataProps {
    title: string;
    id: string;
    year: string;
    start_date: string;
    end_date: string;
    text: string;
    main_image: string;
}

const Travels = () => {

  const [travelData, setTravelData] = useState<TravelDataProps[]>([]);
  const { signedIn } = useContext(AuthContext);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [years, setYears] = useState<number[]>([]);

  const displayData = async () => {
    let q;

    if (selectedYear) {
      // Query for travels where the year field matches the selectedYear
      q = query(
        collection(db, "travels"),
        where("year", "==", selectedYear.toString())  // Convert to string if necessary
      );
    } else {
      // If no year is selected, fetch all travels
      q = query(collection(db, "travels"));
    }

    try {
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data() as TravelDataProps,
        id: doc.id,
      }));

      // Extract years if no specific year is selected
      if (selectedYear === null) {
        const uniqueYears = new Set(newData.map(travel => parseInt(travel.year)));
        setYears(Array.from(uniqueYears).sort((a, b) => b - a));
      }

      // Sort the travels by start_date in descending order (most recent first)
      newData.sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateB.getTime() - dateA.getTime();
      });

      setTravelData(newData);
    } catch (error) {
      console.error("Error fetching travels:", error);
      // Handle the error appropriately
    }
  };

  const handleSelectionChange = (year: number | null) => {
    setSelectedYear(year);
  }

  useEffect(() => {
    displayData();
  }, [selectedYear]);

  return (
    <div className="travels">
      <div className="travels-banner banner">
        <div>
          <h2 className='banner-headline'>NAŠE CESTY</h2>
          <p className='banner-subheadline'>PUTOVÁNÍ ZA NOVÝMI ZÁŽITKY</p>
        </div>
        {years && <TravelsFilter onSelectionChange={handleSelectionChange} years={years} selectedYear={selectedYear}/>}
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
              const newTitle = formatTitleToURL(cesta.title);
              const url = `/cesty/${newTitle}`;
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
                      <h3>{cesta.title} {cesta.year}</h3>
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
