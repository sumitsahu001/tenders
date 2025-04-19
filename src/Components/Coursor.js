import React from 'react';
import first from '../assets/firstt.png'; 
import second from '../assets/first1.webp';
import third from '../assets/second2.jpg';

const Coursor = () => {
  return (
    <>
      <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={first} className="d-block w-100" alt="image" />
          </div>
          <div className="carousel-item">
            <img src={second} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={third} className="object-fit w-100" alt="..." />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleRide"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Coursor;
