import { useState } from 'react';
import './../styles/hamburger.sass'
import './../App.sass';

const Hamburger = () => {

  const [hamburgerOpen, setHamburgerOpen] = useState(false)

  const handleClick = () => {
    setHamburgerOpen(!hamburgerOpen);
  }

  return (
    <div className="hamburger" onClick={handleClick}>
      <div className={hamburgerOpen ? 'burger burger1' : 'burger'}/>
      <div className={hamburgerOpen ? 'burger burger2' : 'burger'} />
      <div className={hamburgerOpen ? 'burger burger3' : 'burger'} />
    </div>
  );
};

export default Hamburger;
