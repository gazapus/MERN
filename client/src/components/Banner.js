import React from 'react';
import '../styles/home.css';
import '../styles/Banner.css';

function Banner(props) {
    return (
        <header className="d-flex justify-content-center p-2">
          <img src={props.image} className="img-fluid" alt="logo de MyTinerary" />
        </header>
    );
}

export default Banner;