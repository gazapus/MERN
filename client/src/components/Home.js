import React from 'react';
import Banner from './Banner';
import AccountMenu from './AccountMenu';
import Main from './Main';
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
      <Main />
      <div className="carouselContainer">
        <p>Popular Mytineraries</p>
        <Carousel />
      </div>
    </div >
  );
}

export default App;
