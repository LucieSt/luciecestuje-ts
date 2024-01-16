// import { useState } from 'react';
// import Lightbox, { ImagesListType } from 'react-spring-lightbox';

// // const images: ImagesListType = [
// //     {
// //         src: 'https://timellenberger.com/static/blog-content/dark-mode/win10-dark-mode.jpg',
// //         loading: 'lazy',
// //         alt: 'Windows 10 Dark Mode Setting',
// //     },
// //     {
// //         src: 'https://timellenberger.com/static/blog-content/dark-mode/macos-dark-mode.png',
// //         loading: 'lazy',
// //         alt: 'macOS Mojave Dark Mode Setting',
// //     },
// //     {
// //         src: 'https://timellenberger.com/static/blog-content/dark-mode/android-9-dark-mode.jpg',
// //         loading: 'lazy',
// //         alt: 'Android 9.0 Dark Mode Setting',
// //     },
// // ];

// const CoolLightbox = ({ images, closeGallery() }) => {
//     const [currentImageIndex, setCurrentIndex] = useState(0);

//     const gotoPrevious = () =>
//         currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

//     const gotoNext = () =>
//         currentImageIndex + 1 < images.length &&
//         setCurrentIndex(currentImageIndex + 1);

//     return (
//       <Lightbox
//         isOpen={true}
//         onPrev={gotoPrevious}
//         onNext={gotoNext}
//         images={images}
//         currentIndex={currentImageIndex}
//         onClose={closeGallery}
//         style={{ background: "rgba(0,0,0, 0.9)" }}
//       />
//     );
// };

// export default CoolLightbox;