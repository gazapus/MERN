import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Container, Row, Col
} from 'reactstrap';
import items from './images';
import '../styles/Carousel.css';


const Example = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.keyCode}
      >
        <ImagesSlide images={item} />
      </CarouselItem>
    );
  });

  return (
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
  );
};

const ImagesSlide = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <ImageSlide image={props.images.images[0].image} altText={props.images.images[0].altText}
            captionHeader={props.images.images[0].caption} />
        </Col>
        <Col>
          <ImageSlide image={props.images.images[1].image} altText={props.images.images[1].altText}
            captionHeader={props.images.images[1].caption} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ImageSlide image={props.images.images[2].image} altText={props.images.images[2].altText}
            captionHeader={props.images.images[2].caption} />
        </Col>
        <Col>
          <ImageSlide image={props.images.images[3].image} altText={props.images.images[3].altText}
            captionHeader={props.images.images[3].caption} />
        </Col>
      </Row>
    </Container>
  );
};

const ImageSlide = (props) => {
  return (
    <figure id="imageSlide" >
      <img src={props.image} alt={props.altText} />
      <figcaption >{props.captionHeader}</figcaption>
    </figure>
  );
};

export default Example;