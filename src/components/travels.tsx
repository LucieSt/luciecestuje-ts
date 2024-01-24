import "./../styles/travels.sass";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { db } from "./../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../authContext";
import { formatTitleToURL } from "../utils";
import TravelsFilter from "./travelsFilter";
import { addParamsToImageUrl } from "../utils";

interface TravelDataProps {
    title: string;
    country: string[];
    id: string;
    year: string;
    start_date: string;
    end_date: string;
    text: string[];
    images: string;
}

const Travels = () => {

  const [travelData, setTravelData] = useState<TravelDataProps[]>([]);
  const { signedIn } = useContext(AuthContext);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false)

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
      queries.push(where("country", "array-contains", selectedCountry));
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

      const newData = querySnapshot.docs.map((doc) => {
        const data = doc.data() as TravelDataProps;
  
        // Modify the image URLs
        const modifiedImages = JSON.parse(data.images).map((group: string[]) => 
          group.map(img => addParamsToImageUrl(img, ""))
        );
  
        return {
          ...data,
          id: doc.id,
          images: JSON.stringify(modifiedImages)
        };
      });

      if (selectedYear && selectedYear !== prevSelectedYear) {
        const uniqueCountries = new Set<string>();
        newData.forEach(travel => travel.country.forEach(c => uniqueCountries.add(c)));
        setCountries(Array.from(uniqueCountries).sort());
      }

      if (!selectedYear && !selectedCountry) {
        const uniqueYears = new Set(newData.map(travel => parseInt(travel.year)));
        setYears(Array.from(uniqueYears).sort((a, b) => b - a));

        const uniqueCountries = new Set<string>();
        newData.forEach(travel => travel.country.forEach(c => uniqueCountries.add(c)));
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

  const handleClickFilter = () => {
    setFilterIsOpen(!filterIsOpen);
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
        <div onClick={handleClickFilter} className="travels-filter-text">FILTR</div>
      </div>

      <div className="content">

        <div className="travels-list">

          {/* FILTER TRAVELS BY YEARS */}
          {filterIsOpen && <div className="travels-link-container">
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
          </div>}

          {/* ADD NEW TRAVEL, IF SIGNED IN */}
          {signedIn && (
            <Link to="/novacesta">
              <div className="travels-link-container">
                <div className="travels-container">
                  <img
                    src="https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706089655/DJI_0662_mawxbx.jpg"
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
              const main_image = JSON.parse(cesta.images)[0][0];
              return (
                <Link key={cesta.id} to={url}>
                  <div className="travels-link-container">
                    <div className="travels-container">
                      <img
                        src={main_image}
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
