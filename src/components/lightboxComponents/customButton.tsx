import { MouseEventHandler } from "react";
import './../../styles/lightboxComponentsStyles/customButtons.sass';
import arrowLeftIcon from './arrow-left.svg';
import arrowRightIcon from "./arrow-right.svg";
import closeIcon from './close.svg';

interface CustomButtonProps {
  handleClick: MouseEventHandler<HTMLImageElement>;
  buttonType: string;
}

const CustomButton = ({ handleClick, buttonType }: CustomButtonProps) => {

  const iconClassName = `lightbox-icon lightbox-icon-${buttonType}`;
  let icon = undefined;

  if (buttonType === "left") {
    icon = arrowLeftIcon;
  }
  else if (buttonType === "right") {
    icon = arrowRightIcon
  } else {
    icon = closeIcon;
  };

  return (
    <img 
      src={icon}
      onClick={handleClick}
      className={iconClassName}
    />
  );
};

export default CustomButton;