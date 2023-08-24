import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import positions from '@data/Style2/career-positions.json';

SwiperCore.use([Autoplay, Navigation]);

import "swiper/css";
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

const CareerPositions = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoad(true));
  }, []);

  return (
    <section className="careers-positions">
      <div className="container">
        <div className="content section-padding border-1 border-top brd-gray">
          <div className="section-head mb-60 style-5">
            <h2 className="mb-20"> Opening <span> Positions </span> </h2>
            <div className="text color-666">More than 15,000 companies trust and choose Itech</div>
          </div>
          <div className="careers-positions-slider5">
            {
              load && (
                <Swiper
                  className="swiper-container"
                  spaceBetween={30}
                  speed={1000}
                  autoplay={{
                    delay: 5000,
                  }}
                  loop={true}
                  pagination={false}
                  navigation={{
                    nextEl: '.careers-positions-slider5 .swiper-button-next',
                    prevEl: '.careers-positions-slider5 .swiper-button-prev',
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    480: {
                      slidesPerView: 1,
                    },
                    787: {
                      slidesPerView: 2,
                    },
                    991: {
                      slidesPerView: 3,
                    },
                    1200: {
                      slidesPerView: 3,
                    }
                  }}
                >
                  {
                    positions.map((position, index) => (
                      <SwiperSlide key={index}>
                        <a href="#" className="position-card mb-4">
                          <h5>{position.title}</h5>
                          <p> {position.description} </p>
                          <div className="time">
                            <span className="me-4"> <i className="fal fa-clock me-1 color-main"></i> {position.type} </span>
                            <span> <i className="fal fa-dollar-sign me-1 color-main"></i> {position.salary} </span>
                          </div>
                          {position.trend && <span className="trend-mark"> <i className="fas fa-bolt"></i> </span>}
                        </a>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              )
            }
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CareerPositions