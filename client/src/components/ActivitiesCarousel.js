import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import Activity from "./Activity";

const responsive = {
     desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3, // optional, default to 1.
     },
     tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2, // optional, default to 1.
     },
     mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide: 1, // optional, default to 1.
     },
};

export default (props) => {

     const activitiesList = props.activities.map(activity => {
          return (
               <li key={activity._id}>
                    <Activity activity={activity} />
               </li>
          )
     });

     return (
          <Carousel swipeable={false}
               draggable={false}
               showDots={true}
               responsive={responsive}
               ssr={true} // means to render carousel on server-side.
               infinite={true}
               autoPlay={true}
               autoPlaySpeed={1500}
               keyBoardControl={true}
               customTransition="all .5"
               transitionDuration={800}
               containerClass="carousel-container"
               removeArrowOnDeviceType={["tablet", "mobile"]}
               dotListClass="custom-dot-list-style"
               itemClass="carousel-item-padding-40-px"
          >
               {activitiesList}
          </Carousel>
     );
}
