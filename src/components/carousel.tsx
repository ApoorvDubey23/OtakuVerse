import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'; // Import autoplay CSS

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'; // Import Autoplay module

export default function Carousel({ data }: any) {
  return (
    <div className="container">
      <img src="/logo.png" alt='OtakuVerse' className="heading float-left h-[10rem] w-[15rem] "/>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        autoplay={{
          delay: 2500, // Delay between transitions in milliseconds
          disableOnInteraction: true, // Disable autoplay on interaction (e.g., hover)
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} // Include Autoplay module
        className="swiper_container"
      >
        {data.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <img src={item.image} alt={`slide_image_${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
