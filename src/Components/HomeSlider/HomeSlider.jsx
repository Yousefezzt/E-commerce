import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  return (
    <>
      <div className='mb-7'>
        <Slider {...settings}>
          <div className='outline-none '>
            <img style={{ width: "85%", height: "450px", margin: "auto", outline: "none" }} src={require("../../slider-1.jpg")} alt="" />
          </div>
          <div>
            <img style={{ width: "85%", height: "450px", margin: "auto", outline: "none" }} src={require("../../slider-2.jpg")} alt="" />
          </div>
          <div>
            <img style={{ width: "85%", height: "450px", margin: "auto", outline: "none" }} src={require("../../slider-3.jpg")} alt="" />
          </div>
        </Slider>
      </div>
    </>
  )
}
