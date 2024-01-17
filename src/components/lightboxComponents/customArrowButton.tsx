import { MouseEventHandler } from "react";
import './../../styles/lightboxComponentsStyles/customArrowButtons.sass';
import arrowLeftIcon from './arrow-left.svg';
import arrowRightIcon from "./arrow-right.svg";

interface CustomArrowButtonProps {
  handleClick: MouseEventHandler<HTMLImageElement>;
  direction: string;
}

const CustomArrowButton = ({ handleClick, direction }: CustomArrowButtonProps) => {
  return (
    <img 
      src={direction == "left" ? arrowLeftIcon : arrowRightIcon}
      onClick={handleClick}
      className={direction == "left" ? "lightbox-arrow lightbox-arrow-left" : "lightbox-arrow lightbox-arrow-right"}
    />
  );
};

export default CustomArrowButton;