import { useState } from 'react';
import Lightbox, { ImagesListType } from 'react-spring-lightbox';
import CustomButton from './customButton';

interface CoolLightboxProps {
  images: string[];
  handleClose: () => void;
  currentImageIndex: number;
}

const CoolLightbox = ({ images, handleClose, currentImageIndex }: CoolLightboxProps) => {

    const [currentIndex, setCurrentIndex] = useState(currentImageIndex);

    const imagesList: ImagesListType = (images||[]).map((image: string, index: number) => ({
      src: image,
      loading: 'lazy',
      alt: `Image ${index + 1}`,
    }));

    const gotoPrevious = () =>
      currentIndex > 0 && setCurrentIndex(currentIndex - 1);

    const gotoNext = () =>
        currentIndex + 1 < images.length &&
        setCurrentIndex(currentIndex + 1);

    return (
      <Lightbox
        isOpen={true}
        onPrev={gotoPrevious}
        onNext={gotoNext}
        images={imagesList}
        currentIndex={currentIndex}
        onClose={handleClose}
        style={{ background: "rgba(0,0,0, 0.9)" }}
        renderPrevButton={() => (
          <CustomButton handleClick={gotoPrevious} buttonType="left"/>
        )}
        renderNextButton={() => (
          <CustomButton handleClick={gotoNext} buttonType="right"/>
        )}
        renderHeader={() => (
          <CustomButton handleClick={handleClose} buttonType="close"/>
        )}
      />
    );
};

export default CoolLightbox;