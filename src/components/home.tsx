import './../styles/home.sass';
import './../App.sass';

const Home: React.FC = () => {

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
          <b>Na tomto blogu najdete:</b><br /><br />
          Cestopisy a tipy na cesty: Prozkoumejte s námi města, venkov, hory i moře. Sdílíme naše zkušenosti, fotky a praktické tipy.<br /><br />
          Průvodce destinacemi: Objevte s námi nejlepší místa, kam vyrazit za kulturou, gastronomií nebo relaxací.<br /><br />
          Rady a triky pro cestovatele: Jak se balit, jak plánovat cestu a jak si cestování užít na maximum.<br /><br />
          Osobní příběhy a dojmy: Naše cestovatelské zážitky, úvahy a příběhy z cest.<br />
          </p>
        </div>
      </div>

      <div className="home1-banner banner"></div>

      <div className="text-container">
        <div className="text-content">
          <p>
          <b>Kam se vydat?</b><br /><br />
          Nenechte si ujít <a href="/cesty">naši&nbsp;poslední&nbsp;cestu</a> nebo prozkoumejte <a href="/cesty">všechny&nbsp;naše&nbsp;cesty</a> a nechte se inspirovat pro vaše další dobrodružství.<br /><br />
          Zajímá vás, jak cestujeme? <a href="/zdena">Přečtěte&nbsp;si&nbsp;o&nbsp;Zdeně</a>, naší věrné dodávce, a dozvíte se, jak jsme ji vybudovali a přizpůsobili pro naše 
          dobrodružství.<br /><br /><br />
          <hr /><br />
          <b>Newsletter</b><br /><br />
          Přihlaste se k našemu newsletteru a dozvíte se tak jako první o naší nové cestě!<br /><br />
          --- Tady bude formular newsletteru ---<br /><br />
          <hr /><br /><br />
          Chcete vědět víc o nás? <a href="/onas">Tady</a> sdílíme naši filozofii cestování, příběhy a další zajímavosti.<br /><br />
          Přidejte se k nám na cestě za dobrodružstvím a krásami naší planety.<br /><br /><br />
          Lucie cestuje - a vy můžete být u toho!<br /><br /><br />
          &#9829;<br />
          </p>
        </div>
      </div>

      <div className="home2-banner banner"></div>
    </div>
  );
};

export default Home;