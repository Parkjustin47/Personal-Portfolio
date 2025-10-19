import React from 'react'
import { DataArray } from '@/app/data'
import Slider from 'react-slick'
import SliderCard from './SliderCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function MySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <style jsx global>{`
        .slick-dots {
          bottom: -50px;
        }
        
        .slick-dots li button:before {
          color: #05d9e8;
          font-size: 12px;
        }
        
        .slick-dots li.slick-active button:before {
          color: #05d9e8;
          opacity: 1;
        }
        
        .slick-prev:before,
        .slick-next:before {
          color: #05d9e8;
          font-size: 24px;
        }
        
        .slick-prev {
          left: -40px;
          z-index: 1;
        }
        
        .slick-next {
          right: -40px;
          z-index: 1;
        }
        
        @media (max-width: 768px) {
          .slick-prev {
            left: 10px;
          }
          
          .slick-next {
            right: 10px;
          }
        }
      `}</style>
      
      <Slider {...settings}>
        {DataArray.map((item, index) => (
          <div key={index}>
            <SliderCard item={item} index={index} />
          </div>
        ))}
      </Slider>
    </div>
  )
}
