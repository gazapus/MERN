import React from "react";
import Slider from "react-slick";

import "../styles/Activities.css";

export default function() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 3000,
      cssEase: "linear",
      pauseOnHover: true
    };
    return (
      <div>
        <h2> Activites </h2>
        <Slider {...settings}>
          <div>
            <div className="activityContainer">
              <img className="imgCarousel" src="http://placekitten.com/g/400/200" />
            </div>
          </div>
          <div>
            <div className="activityContainer">
              <img className="imgCarousel" src="http://placekitten.com/g/400/200" />
            </div>
          </div>
          <div>
            <div className="activityContainer">
              <img className="imgCarousel" src="http://placekitten.com/g/400/200" />
            </div>
          </div>
          <div>
            <div className="activityContainer">
              <img className="imgCarousel" src="http://placekitten.com/g/400/200" />
            </div>
          </div>
          <div>
            <div className="activityContainer">
              <img className="imgCarousel" src="http://placekitten.com/g/400/200" />
            </div>
          </div>
          <div>
            <div className="activityContainer">
              <img className="imgCarousel" src="http://placekitten.com/g/400/200" />
            </div>
          </div>
          <div>
            <div className="activityContainer">
              <img className="imgCarousel" src="http://placekitten.com/g/400/200" />
            </div>
          </div>
          <div>
            <div className="activityContainer">
              <img className="imgCarousel" src="http://placekitten.com/g/400/200" />
            </div>
          </div>
          <div>
            <div className="activityContainer">
              <img className="imgCarousel" src="http://placekitten.com/g/400/200" />
            </div>
          </div>
        </Slider>
      </div>
    );
}
