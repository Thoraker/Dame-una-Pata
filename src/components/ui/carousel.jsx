import { useState } from "react";

import PropTypes from "prop-types";

const Carousel = ({ photos }) => {
  const [index, setIndex] = useState(0);

  const goToNextSlide = () => {
    const isLastSlide = index === photos.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  };

  const goToPreviousSlide = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? photos.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const goTo = (photo) => {
    setIndex(photo);
  };

  return (
    <div className="position-relative m-3 shadow rounded-3">
      <div
        className="position-absolute top-50 z-1 start-0 translate-middle-y fs-1 text-light"
        role="button"
        onClick={goToNextSlide}
      >
        <i className="bi bi-caret-left"></i>
      </div>
      <div className="ratio ratio-16x9 rounded-3">
        {(!photos && (
          <img
            src="https://res.cloudinary.com/dqehz6slh/image/upload/v1688428662/i4wkbtuttjhln2xenvuc.webp"
            alt=""
          />
        )) || <img src={photos[index].url} alt="" />}
      </div>
      <div
        className="position-absolute top-50 z-1 end-0 translate-middle-y fs-1 text-light"
        role="button"
        onClick={goToPreviousSlide}
      >
        <i className="bi bi-caret-right"></i>
      </div>
      <div className="position-absolute bottom-0 start-50 translate-middle-x">
        <div className="d-flex">
          {photos &&
            photos.map((slide, index) => (
              <div
                key={index}
                className="m-1 fs-5 text-light "
                role="button"
                onClick={() => goTo(index)}
              >
                <i className="bi bi-square-fill"></i>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

Carousel.propTypes = {
  photos: PropTypes.array,
};
