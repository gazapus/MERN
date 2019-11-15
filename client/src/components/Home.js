import React from 'react';
import Banner from './Banner';
import AccountMenu from './AccountMenu';
import NavBotton from './NavBotton';
import Arrow from "../images/Arrow.png";
import Carousel from './CarouselImages';
import GeneralMenu from './GeneralMenu';
import MYtineraryLogo from '../images/MYtineraryLogo.png';
import '../styles/home.css';

function App() {
  return (
    <div className="container w-100 h-100 p-1">
      <nav>
        <AccountMenu />
        <span id="menu">
          <GeneralMenu />
        </span>
      </nav>
      <Banner image={MYtineraryLogo} />
      <p className="text-center">Find your perfect trip, designed by insiders who know and love their cities</p>
      <NavBotton link="/Cities" alt="browse cities" img={Arrow}/>
      <div className="carouselContainer">
        <p>Popular Mytineraries</p>
        <Carousel />
      </div>
    </div >
  );
}

export default App;
