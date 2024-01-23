import { useState } from 'react';
import CoolLightbox from "./lightboxComponents/lightboxSetup";
import './../styles/zdena.sass'
import './../App.sass';
import Markdown from 'react-markdown';

const Zdena = () => {

  const galleriesData = [
    {
      text: "Během covidové pandemie jsme se rozhodli pro velký projekt - přestavbu dodávky, kterou jsme pojmenovali Zdena.\n\nTento projekt jsme realizovali v jihočeské vesnici Dírna, kde jsme v průběhu dvou let, s nákupem vozidla v dubnu 2021, vdechli život našemu mobilnímu domovu.Naším cílem bylo vytvořit komfortní prostor, který by nám umožnil cestovat a pracovat odkudkoliv.\n\nZačali jsme úpravou předních sedadel tak, aby byly otočné, a odstranili jsme vnitřní stěnu. Místo ní jsme umístili dva vyjímatelné stoly, díky kterým můžeme v Zdeně pohodlně pracovat. Uvnitř vozu se nachází nádrž na 100 litrů čerstvé vody, umístěná vzadu, a přibližně 20litrová nádrž na šedou vodu pod dřezem.",
      images: [
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034116/IMG_5779_ef8iuf.jpg", 
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034114/IMG_5313_geiajn.jpg", 
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034109/IMG_0354_pcplze.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034118/IMG_6420_ix78le.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034114/IMG_5598_n1thqc.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034119/IMG_6478_fxvmvr.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034112/IMG_4681_da1ncv.jpg",
      ]
    },
    {
      text: "Naše plně vybavená kuchyně zahrnuje dřez a dva vařiče na propan-butan. Pro ukládání potravin a kuchyňských potřeb jsme vytvořili úložný prostor jak pod kuchyní ve formě výsuvných šuplíků, tak i nad ní. Pro uskladnění potravin máme také chladničku s vrchním plněním na 12 voltů.\n\nKromě toho jsme do vozu nainstalovali elektrickou síť 230 voltů, abychom mohli dobíjet naše notebooky, elektrokola a další zařízení. Na střeše se nachází dva solární panely a střešní nosič, stejně jako dvě střešní okna s ventilátorem, které umožňují vytvořit průvan ve voze, když je horko. Solární panely nabíjejí naši externí baterii.\n\nPro větší světlost interiéru jsme do bočních dveří umístili okno, takže i když prší a máme zavřené dveře, je uvnitř světlo. V dodávce jsme také nainstalovali osvětlení a malé topení, které čerpá naftu přímo z palivové nádrže našeho vozu.\n\nModel našeho vozu je Ford Transit L3H3 z roku 2017, takže je dostatečně vysoký, abychom se v něm mohli pohodlně postavit i sedět na lůžku. Lůžko jsme navíc vybavili mechanismem, který umožňuje jeho zvednutí o 35 cm stisknutím tlačítka, což značně zjednodušuje naložení a vyložení našich elektrokol.\n\nTato přestavba nám otevřela dveře k nekonečným dobrodružstvím po celé Evropě. Zdena se stala nejen naším domovem na kolech, ale také spolehlivým parťákem na našich cestách.",
      images: [
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034109/IMG_0857_rzduhi.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706035791/IMG_4461_ek0jip.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034109/IMG_0845_kqtc7t.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706035792/IMG_4218_hzzcaf.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034112/IMG_1122_vqbjvu.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706035791/IMG_3774_my12zf.jpg",
      ]
    },
    {
      text: "Jako první věc jsme dodávku uklidili, vyndali přepážku dělící kabinu od úložného prostoru, a začali jsme pokládat zvukovou izolaci.\n\nRozhodli jsme se, že z boku chceme velké okno a na střeše dvě menší se zabudovaným větrákem.\n\nNásledně jsme dodávku zaizolovali k-flexem. Tato fáze trvala nekonečně dlouho, kvůli záhybům, které tvoří vnitřní stěny dodávky a navíc nás zpomalovala přicházející zima.\n\nPosledním krokem této základní fáze byla podlaha, kterou jsme také zaizolovali a rošt z latí polozili překližkové desky.",
      images: [
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034114/IMG_5594_vg27ov.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034115/IMG_5618_rg54c0.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034116/IMG_5739_n3xzm4.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034119/IMG_7804_qaduct.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034120/IMG_7825_sboytl.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034120/IMG_7846_klcsix.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034121/IMG_7882_oxxeq7.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034120/IMG_7876_go5xsh.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034121/IMG_7889_nnktb7.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034121/IMG_7897_d5rtyj.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034122/IMG_8200_bjnqrh.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034122/IMG_8221_r4aro2.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034118/IMG_5985_vxd6sj.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034122/IMG_8865_dfaq5r.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034123/IMG_8868_ghpeth.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034123/IMG_9834_comfut.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034123/IMG_9860_px4ahf.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034124/IMG_9889_lwqkk7.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034124/IMG_9884_eilzxo.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034124/IMG_9885_fjuqfn.jpg"
      ]
    },
    {
      text: "Následně nastala konečně trochu veselejsí část - tvorba stropu, stěn a nábytku.\n\nBylo potřeba sestavit celý elektrický a vodní systém a přidělat na střechu solární panely.",
      images: [
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034113/IMG_4704_p1j1mx.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034113/IMG_4713_p9l38d.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034113/IMG_4741_v3u9pr.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034114/IMG_4748_z5ynyh.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034116/IMG_5862_jxi5pt.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034116/IMG_5857_kn4ods.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034110/IMG_4236_vsmodt.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034118/IMG_5884_y5uc8z.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034119/IMG_6423_g1o0l2.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034119/IMG_6439_a5pjl7.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034116/IMG_5878_aqwmfd.jpg",
        "https://res.cloudinary.com/dnwbnhdof/image/upload/c_scale,w_auto/dpr_auto/v1706034112/IMG_4679_a9rwwe.jpg"
      ]
    }
  ];

  const [galleries, setGalleries] = useState(
    galleriesData.map(() => ({ show: false, index: 0 }))
  );

  console.log("galleries:",galleries);

  const openGallery = (galleryIndex: number, imageIndex: number) => {
    setGalleries(galleries.map((gallery, index) => 
      index === galleryIndex ? { ...gallery, show: true, index: imageIndex } : gallery
    ));
  };

  const closeGallery = (galleryIndex: number) => {
    setGalleries(galleries.map((gallery, index) => 
      index === galleryIndex ? { ...gallery, show: false } : gallery
    ));
  };

  return (
    <div className="zdena-wrapper">
      <div className="zdena-banner banner">
        <div>
          <h2 className='banner-headline'>ZDENA</h2>
          <p className='banner-subheadline'>ANEB STAVBA DOMU NA ČTYŘECH KOLECH</p>
        </div>
      </div>

      {galleriesData.map((gallery, galleryIndex) => (
        <div key={galleryIndex}>

          <div className="text-container">
            <div className="text-content">
              <Markdown>{gallery.text}</Markdown>
            </div>
          </div>

          <ul className="images-container">
            {gallery.images.map((image, imageIndex) => (
              <li key={imageIndex} onClick={() => openGallery(galleryIndex, imageIndex)}>
                <img src={image} alt={`Gallery ${galleryIndex} Image ${imageIndex}`} />
              </li>
            ))}
          </ul>

          {galleries[galleryIndex].show && (
            <CoolLightbox 
              images={gallery.images} 
              handleClose={() => closeGallery(galleryIndex)} 
              currentImageIndex={galleries[galleryIndex].index} 
            />
          )}
        </div>
      ))}

    </div>
  );
};

export default Zdena;