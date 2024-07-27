import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from 'react-slick'

export default function CategorySlider() {



  function getAllCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }


  const { data } = useQuery("category", getAllCategory, {
    refetchOnMount: false
  })


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false
  };




  return (
    <div className='  w-[85%] container mx-auto'>
      <Slider {...settings}>
        {data?.data.data.map((item) => {
          return <div key={item.id} className='outline-none my-7 '>
            <img style={{ width: "100%", height: "200px", }} src={item.image} alt={item.name} />
            <h6 className='mt-2'>{item.name}</h6>
          </div>
        })}

      </Slider>
    </div>
  )
}
