import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import clients from '@data/Style2/clients.json';

SwiperCore.use([Autoplay]);

import "swiper/css";
import 'swiper/css/autoplay';

const Clients = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoad(true));
  }, []);

  return (
    <section className="clients-imgs pt-100">
      <div className="container">
        <div className="section-head text-center mb-70 style-5">
          <h2 className="mb-20"> Trusted By Thousands <span> Business </span> </h2>
        </div>
        <div className="clients-content">
          {
            clients.map((client, index) => (
              <a href="#" className="client-logo" key={index}>
                <img src={client} alt="" />
              </a>
            ))
          }
        </div>
        <h5 className="text-center mt-50"> More <span className="color-blue5"> 15,000 </span> Companies & partners trusted & choice Itekseo </h5>
      </div>
      <div className="about2-imgs-slider pt-100">
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
                  slidesPerView: 3,
                }
              }}
            >
              <SwiperSlide>
                <a href="#" className="img img-cover">
                  <img src="/assets/img/about/about2_1.png" alt="" />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className="img img-cover">
                  <img src="/assets/img/about/about2_2.png" alt="" />
                </a>
              </SwiperSlide>
              <SwiperSlide>
                <a href="#" className="img img-cover">
                  <img src="/assets/img/about/about2_3.png" alt="" />
                </a>
              </SwiperSlide>
            </Swiper>
          )
        }
      </div>
    </section>
  )
}

export default Clients