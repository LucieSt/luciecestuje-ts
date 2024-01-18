import { useEffect, useState } from 'react';
import { db } from './../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import './../styles/home.sass';
import './../App.sass';
import NewsletterForm from './newsletterForm';
import { formatTitleToURL } from '../utils';
import { useNavigate } from 'react-router-dom';

interface TravelData {
  title: string;
  start_date: string;
  end_date: string;
  year: string;
  text: string;
  images: string[];
  main_image: string;
  map_url: string | null;
}

const Home: React.FC = () => {

  const [latestTravel, setLatestTravel] = useState<TravelData | null>(null);
  const [latestTravelUrl, setLatestTravelUrl] = useState<string>("");

  useEffect(() => {
    const fetchLatestTravel = async () => {
      const q = query(collection(db, "travels"), orderBy("start_date", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latestTravelData = querySnapshot.docs[0].data() as TravelData;
        setLatestTravel(latestTravelData);
        const titleForUrl = formatTitleToURL(latestTravelData.title);
        setLatestTravelUrl(`/cesty/${titleForUrl}`)
      }
    };

    fetchLatestTravel();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <div className="home-banner banner"></div>

      <div className="text-container">
        <div className="text-content">
          <h2>Vítejte na Lucie Cestuje!</h2>
          <p>
          <br />Objevte s námi krásy světa, jedinečné destinace a tajemné kouty, které čekají jen na vaši návštěvu. Naše cesty jsou plné dobrodružství, 
          nových zážitků a nezapomenutelných vzpomínek.<br /><br />
          Připojte se k našemu putování a nechte se inspirovat pro vaši příští cestu.<br /><br /><br />
          </p>
          <hr /><br />

          <h2>Na tomto blogu najdete:</h2>
          <p>
          <br />Cestopisy a tipy na cesty: Prozkoumejte s námi města, venkov, hory i moře. Sdílíme naše zkušenosti, fotky a praktické tipy.<br /><br />
          Průvodce destinacemi: Objevte s námi nejlepší místa, kam vyrazit za kulturou, gastronomií nebo relaxací.<br /><br />
          Rady a triky pro cestovatele: Jak se balit, jak plánovat cestu a jak si cestování užít na maximum.<br /><br />
          Osobní příběhy a dojmy: Naše cestovatelské zážitky, úvahy a příběhy z cest.<br />
          </p>
        </div>
      </div>

      <div className="home1-banner banner"></div>

      <div className="text-container">
        <div className="text-content">
          <h2>Kam se vydat?</h2><br /><br />
          <p>
          Nenechte si ujít <a href={latestTravelUrl}>naši&nbsp;poslední&nbsp;cestu</a> nebo prozkoumejte <a href="/cesty">všechny&nbsp;naše&nbsp;cesty</a> a nechte se inspirovat pro vaše další dobrodružství.<br /><br />
          </p><br />

          {latestTravel && (
            <div
              className="banner"
              style={{ backgroundImage: `url(${latestTravel.main_image})`, height: "400px", cursor: "pointer" }}
              onClick={() => navigate(latestTravelUrl)}
            >
              <div>
                <h2 className='banner-headline'>{latestTravel.title.toUpperCase()}</h2>
              </div>
            </div>
          )}

        </div>
      </div>

      
      
      <div className="text-container">
        <div className="text-content">
          <h2>Zajímá vás, jak cestujeme?</h2><br /><br />
          <p>
          <a href="/zdena">Přečtěte&nbsp;si&nbsp;o&nbsp;Zdeně</a>, naší věrné dodávce, a dozvíte se, jak jsme ji vybudovali a přizpůsobili pro naše 
          dobrodružství.
          </p>
        </div>
      </div>

      <div className="home2-banner banner"></div>

      <div className="text-container">
        <div className="text-content">
          <h2>Newsletter</h2><br /><br />
          <p>
          Přihlaste se k našemu newsletteru a buďte mezi prvními, kdo se dozví o naší nové cestě!<br /><br />
          V každém emailu poskytujeme možnost odhlášení, takže se můžete kdykoli rozhodnout přestat dostávat naše novinky<br /><br />
          Zde se můžete přihlásit:<br />
          </p>

          <NewsletterForm />

          <hr /><br />

          <h2>Chcete vědět víc o nás?</h2><br /><br />
          <p>
          <a href="/onas">Tady&nbsp;sdílíme</a> naši filozofii cestování, příběhy a další zajímavosti.<br /><br />
          Přidejte se k nám na cestě za dobrodružstvím a krásami naší planety.<br /><br /><br />
          Lucie cestuje - a vy můžete být u toho!<br /><br /><br />
          &#9829;<br />
          </p>
        </div>
      </div>

      <div className="home3-banner banner"></div>
    </div>
  );
};

export default Home;