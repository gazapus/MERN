import React from 'react';
import { Link } from "react-router-dom";
import '../styles/NavBotton.css';

export default (props) => {
     return (
          <Link to={props.link}>
               <div id="NavBottonContainer">
                    <img id="NavIcon" src={props.img} alt={props.alt} />
               </div>
          </Link>
     );
};