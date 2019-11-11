import React from 'react';
import circledRight from '../images/circled-right-2.png';
import { Link } from "react-router-dom";

function Main() {
    return (
    <div className="d-flex flex-column align-items-center w-100 p-3">
        <p className="text-center">Find your perfect trip, designed by insiders who know and love their cities</p>
        <Link to="/City" className="d-flex justify-content-center">
          <img src={circledRight} alt="browse" className="w-25" />
        </Link>
    </div>
    );
}

export default Main;