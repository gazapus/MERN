import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../images/home.svg";
import "../styles/HomeIco.css";

export default props => {
    return (
        <Link to="/">
            <div id="homeIconContainer">
                <img id="homeIcon" src={HomeIcon} alt="home" />
            </div>
        </Link>
    )};