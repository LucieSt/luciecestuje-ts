import { useState } from 'react';
import CoolLightbox from "./lightboxComponents/lightboxSetup";
import './../styles/zdena.sass'
import './../App.sass';

const Zdena = () => {

  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setShowGallery(true);
  }

  const closeGallery = () => {
    setShowGallery(false);
  }

	let images = [
		"https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1704490222/IMG_1443_acxa9y.jpg", 
		"https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1704490241/IMG_1547_eegegl.jpg", 
		"https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1704490275/IMG_2026_c51td9.jpg", 
		"https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1704490301/IMG_1930_n3p91y.jpg", 
		"https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1704490257/IMG_1815_sbxgya.jpg"
	]

  return (
    <div className="zdena-wrapper">
      <div className="zdena-banner banner">
        <div>
          <h2 className='banner-headline'>ZDENA</h2>
          <p className='banner-subheadline'>ANEB STAVBA DOMU NA ČTYŘECH KOLECH</p>
        </div>
      </div>
      <div className="text-container">
        <div className="text-content">
          <h2>Přestavba naší Zdeny</h2>
          <p><br />Během covidové pandemie jsme se rozhodli pro velký projekt – přestavbu dodávkového vozu, který jsme pojmenovali Zdena. Tento projekt jsme realizovali 
          v jihočeské vesnici Dírna, kde jsme v průběhu dvou let, s nákupem vozidla v dubnu 2021, vdechli život našemu mobilnímu domovu.<br /><br />
          Naším cílem bylo vytvořit komfortní prostor, který by nám umožnil cestovat a pracovat odkudkoliv. Začali jsme úpravou předních sedadel tak, aby byly otočné, 
          a odstranili jsme vnitřní stěnu. Místo ní jsme umístili dva vyjímatelné stoly, díky kterým můžeme v Zdeně pohodlně pracovat. Uvnitř vozu se nachází nádrž na 
          100 litrů čerstvé vody, umístěná vzadu, a přibližně 20litrová nádrž na šedou vodu pod dřezem.<br /><br />
          Naše plně vybavená kuchyně zahrnuje dřez a dva vařiče na propan-butan. Pro ukládání potravin a kuchyňských potřeb jsme vytvořili úložný prostor jak pod kuchyní 
          ve formě výsuvných šuplíků, tak i nad ní. Pro uskladnění potravin máme také chladničku s vrchním plněním na 12 voltů.<br /><br />
          Kromě toho jsme do vozu nainstalovali elektrickou síť 230 voltů, abychom mohli dobíjet naše notebooky, elektrokola a další zařízení. Na střeše se nachází dva 
          solární panely a střešní nosič, stejně jako dvě střešní okna s ventilátorem, které umožňují vytvořit průvan ve voze, když je horko. Solární panely nabíjejí 
          naši externí baterii.<br /><br />
          Pro větší světlost interiéru jsme do bočních dveří umístili okno, takže i když prší a máme zavřené dveře, je uvnitř světlo. V dodávce jsme také nainstalovali 
          osvětlení a malé topení, které čerpá naftu přímo z palivové nádrže našeho vozu.<br /><br />
          Model našeho vozu je Ford Transit L3H3 z roku 2017, takže je dostatečně vysoký, abychom se v něm mohli pohodlně postavit i sedět na lůžku. Lůžko jsme navíc 
          vybavili mechanismem, který umožňuje jeho zvednutí o 35 cm stisknutím tlačítka, což značně zjednodušuje naložení a vyložení našich elektrokol.<br /><br />
          Tato přestavba nám otevřela dveře k nekonečným dobrodružstvím po celé Evropě. Zdena se stala nejen naším domovem na kolech, ale také spolehlivým parťákem na 
          našich cestách.</p>
        </div>
      </div>
      <ul className="images-container">
				{images?.map((image, index) => {
        return (
					<li>
						<img
						key={index}
						src={image}
						width="100%"
						alt="image"
            onClick={() => openGallery(index)}
						></img>
					</li>
					);
				})}
      </ul>

      {showGallery && (
        <CoolLightbox images={images || []}  handleClose={closeGallery} currentImageIndex={currentIndex}/>
      )}  

    </div>
  );
};

export default Zdena;