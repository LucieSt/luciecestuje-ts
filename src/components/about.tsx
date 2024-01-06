import './../styles/about.sass'
import './../App.sass';

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-banner banner">
        <div>
          <h2 className='banner-headline'>O NÁS</h2>
          <p className='banner-subheadline'>LUCIE, FILIP A ZDENA</p>
        </div>
      </div>
      <div className="text-container">
        <div className="text-content">
          <h2>Příběhy z našich cest</h2>
          <p><br />Vítejte na našem blogu! Jsme Lucie a Filip, pár vášnivých cestovatelů, kteří se rozhodli s vámi sdílet své dobrodružství. Naše cesty jsou o objevování 
          nových míst, kultur a o vytváření nezapomenutelných vzpomínek.<br /><br />Naše láska k cestování začala před několika lety a od té doby jsme navštívili mnoho 
          evropských zemí. Ať už je to v naší dodávce, kterou jsme pojmenovali Zdena a sami přizpůsobili pro dlouhé cesty, nebo spontánní výlety bez předchozího plánování, 
          vždy hledáme nové zážitky a dobrodružství.<br /><br />Se Zdenou jsme procestovali nádherné pobřeží, malebné vesnice a rušné městské scény. Když necestujeme v našem 
          pojízdném domově, rádi objevujeme destinace letecky nebo vlakem, abychom prozkoumali vzdálenější a méně dostupné oblasti.<br /><br />Na našem blogu se s vámi 
          podělíme o příběhy z cest, užitečné tipy pro cestovatele, průvodce po zajímavých místech a fotogalerie zachycující krásu míst, která jsme navštívili. 
          Doufáme, že vás naše zážitky inspirují k vykročení z komfortní zóny a prozkoumání toho, co svět nabízí.<br /><br />Sledujte nás, abyste se dozvěděli více 
          o našich cestách a životě na cestě s naší milovanou Zdenou. Těšíme se, že s vámi budeme sdílet naše příběhy a snad vás potkáme někde na cestách!<br /><br />
          S láskou,<br /><br />Lucie a Filip</p>
        </div>
      </div>
      <div className="about-image1 banner"></div>
      <div className="text-container">
        <div className="text-content">
          <h2>Prozkoumejte naši Zdenu!</h2>
          <p><br />Chcete vědět více o tom, jak jsme přestavěli naši milovanou dodávku Zdenu na dokonalý domov na kolech?<br /><br />
          <a href="/zdena">Zde&nbsp;najdete&nbsp;kompletní&nbsp;příběh</a>, od prvních nápadů až po finální realizaci, doprovázený fotografiemi a detaily, které vás mohou inspirovat 
          k vytvoření vašeho vlastního domova na kolech!<br /><br /></p>
          <hr /><br /><br />
          <h2>Přihlaste se k odběru našeho newsletteru</h2>
          <p><br />Chcete být první, kdo se dozví o našich nových dobrodružstvích a příbězích z cest?<br /><br />
          Přihlaste se k odběru našeho newsletteru! Stačí zadat váš email níže a budete pravidelně dostávat novinky přímo do vaší schránky. Informujeme vás o nových 
          příspěvcích na blogu, tipy na cestování, a samozřejmě nejnovějších aktualizacích naší cesty se Zdenou.<br /><br />
          --- Tady bude formular newsletteru ---<br /><br /><br />
          Děkujeme, že jste součástí naší cestovatelské komunity!</p>
        </div>
      </div>
      <div className="about-image2 banner"></div>
      
    </div>
  );
};

export default About;
