import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import images from '@data/Style2/images.json';

SwiperCore.use([Autoplay]);

import "swiper/css";
import 'swiper/css/autoplay';

const Images = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoad(true));
  }, []);

  return (
    <section className="careers-images pb-100">
      <div className="section-head text-center mb-60 style-5">
        <h2 className="mb-20"> We&apos;re Looking For <span> Talented People </span> </h2>
        <div className="text color-666">More than 15,000 companies trust and choose Itech</div>
        <button className="btn bg-blue5 sm-butn text-white hover-darkBlue mt-4 rounded-pill">
          <span>See All Positions</span>
        </button>
      </div>
      <div className="imgs-content">
        <div className="imgs-content-slider mb-5">
          {
            load && (
              <Swiper
                className="swiper-container"
                spaceBetween={50}
                speed={10000}
                autoplay={{
                  delay: 1,
                }}
                loop={true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 1,
                  },
                  787: {
                    slidesPerView: 1,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  }
                }}
              >
                {
                  images.ltr.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="img img-cover radius-5 overflow-hidden">
                        <img src={image} alt="" />
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            )
          }
        </div>
        <div className="imgs-content-slider" dir="rtl">
          {
            load && (
              <Swiper
                className="swiper-container"
                spaceBetween={50}
                speed={10000}
                autoplay={{
                  delay: 1,
                }}
                loop={true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 1,
                  },
                  787: {
                    slidesPerView: 1,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  }
                }}
              >
                {
                  images.rtl.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="img img-cover radius-5 overflow-hidden">
                        <img src={image} alt="" />
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default Images