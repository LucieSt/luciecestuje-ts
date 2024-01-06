// import { useState } from 'react';
import './../styles/hamburger.sass'
import './../App.sass';

interface HamburgerProps {
  isHamburgerOpen: boolean;
  onChange: (isOpen: boolean) => void;
}

const Hamburger: React.FC<HamburgerProps> = ({ isHamburgerOpen, onChange }) => {

  // const [hamburgerOpen, setHamburgerOpen] = useState(false)

  const handleClick = () => {
    onChange(!isHamburgerOpen);
  }

  return (
    <>
      <div className="hamburger" onClick={handleClick}>
        <div className={isHamburgerOpen ? 'burger burger1' : 'burger'}/>
        <div className={isHamburgerOpen ? 'burger burger2' : 'burger'} />
        <div className={isHamburgerOpen ? 'burger burger3' : 'burger'} />
      </div>
    </>
  );
};

export default Hamburger;
