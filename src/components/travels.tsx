import "./../styles/travels.sass";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { db } from "./../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../authContext";
import { formatTitleToURL } from "../utils";
import TravelsFilter from "./travelsFilter";

interface TravelDataProps {
    title: string;
    country: string;
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
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);

  const usePrevious = <T,>(value: T): T | undefined => {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevSelectedYear = usePrevious(selectedYear);
  const prevSelectedCountry = usePrevious(selectedCountry);

  const displayData = async () => {
    let queries = [];

    if (selectedYear) {
      queries.push(where("year", "==", selectedYear.toString()));
    }
    if (selectedCountry && selectedCountry !== prevSelectedCountry) {
      queries.push(where("country", "==", selectedCountry));
      if (selectedYear) {
        queries.push(where("year", "==", selectedYear.toString()));
      }
    }

    let q;
    if (queries.length > 0) {
      q = query(collection(db, "travels"), ...queries);
    } else {
      q = query(collection(db, "travels"));
    }

    try {
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data() as TravelDataProps,
        id: doc.id,
      }));

      if (selectedYear && selectedYear !== prevSelectedYear) {
        const uniqueCountries = new Set(newData.map(travel => travel.country));
        setCountries(Array.from(uniqueCountries).sort());
      }

      if (!selectedYear && !selectedCountry) {
        const uniqueYears = new Set(newData.map(travel => parseInt(travel.year)));
        setYears(Array.from(uniqueYears).sort((a, b) => b - a));

        const uniqueCountries = new Set(newData.map(travel => travel.country));
        setCountries(Array.from(uniqueCountries).sort());
      }

      newData.sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateB.getTime() - dateA.getTime();
      });

      setTravelData(newData);
    } catch (error) {
      console.error("Error fetching travels:", error);
    }
  };

  const handleYearSelectionChange = (year: number | null) => {
    setSelectedYear(year);
  }

  const handleCountrySelectionChange = (country: string | null) => {
    setSelectedCountry(country);
  }

  useEffect(() => {
    setSelectedCountry(null);
    displayData();
  }, [selectedYear]);

  useEffect(() => {
    displayData();
  }, [selectedCountry]);

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

          {/* FILTER TRAVELS BY YEARS */}
          <div className="travels-link-container">
            <div>
              {years && countries &&
                <TravelsFilter
                  onYearSelectionChange={handleYearSelectionChange}
                  onCountrySelectionChange={handleCountrySelectionChange}
                  years={years}
                  selectedYear={selectedYear}
                  countries={countries}
                  selectedCountry={selectedCountry}
                />
              }
            </div>
          </div>

          {/* ADD NEW TRAVEL, IF SIGNED IN */}
          {signedIn && (
            <Link to="/novacesta">
              <div className="travels-link-container">
                <div className="travels-container">
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

          {/* LIST OF TRAVELS */}
          {travelData &&
            travelData.map((cesta) => {
              const newTitle = formatTitleToURL(cesta.title);
              const url = `/cesty/${newTitle}`;
              return (
                <Link key={cesta.id} to={url}>
                  <div className="travels-link-container">
                    <div className="travels-container">
                      <img
                        src={cesta.main_image}
                        alt={cesta.title}
                        width="100%"
                        height="auto"
                      />
                      <h3>{cesta.title} {cesta.year} {cesta.country}</h3>
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
