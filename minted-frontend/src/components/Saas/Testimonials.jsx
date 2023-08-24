import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import testimonials from '@data/Saas/testimonials.json';
import testimonialsRTL from '@data/Saas/testimonials-rtl.json';

import "swiper/css";
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

SwiperCore.use([Pagination, Autoplay]);

const Testimonials = ({ rtl }) => {
  const testimonialsData = rtl ? testimonialsRTL : testimonials;

  return (
    <section className="testimonials section-padding bg-gray5 style-5" data-scroll-index="5">
      <div className="container">
        <div className="section-head text-center mb-60 style-5">
          <h2 className="mb-20">{ rtl ? 'مراجعات' : 'Clients' } <span>{ rtl ? 'العملاء' : 'Reviews' }</span> </h2>
          <p>{ rtl ? 'لقد أحببت Iteck من آلاف العملاء في جميع أنحاء العالم وحصلت على ثقة من الشركات الكبرى.' : 'Iteck loved from thoudsands customer worldwide and get trusted from big companies.' }</p>
        </div>
      </div>
      <div className="content">
        <div className="testimonial-slider position-relative style-5">
          <Swiper
            className="swiper-container pb-70"
            spaceBetween={0}
            slidesPerView={4}
            speed={1000}
            pagination={{
              el: ".testimonial-slider.style-5 .swiper-pagination",
              clickable: true,
            }}
            navigation={false}
            mousewheel={false}
            keyboard={true}
            autoplay={{
              delay: 4000
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
                slidesPerView: 2,
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
              testimonialsData.map((testimonial, i) => (
                <SwiperSlide key={i}>
                  <a href="#" className="testi-card style-5">
                    <div className="stars">
                      { Array(testimonial.stars).fill().map((_, t) => (<i className="fas fa-star" key={t}></i>)) }
                    </div>
                    <div className="text">
                      { testimonial.comment }
                    </div>
                    <div className="user mt-40 text-center">
                      <div className="icon-80 rounded-circle img-cover overflow-hidden m-auto">
                        <img src={testimonial.author.image} alt="" />
                      </div>
                      <h6>{ testimonial.author.name }</h6>
                      <small>{ testimonial.author.position }</small>
                    </div>
                  </a>
                </SwiperSlide>
              ))
            }
          </Swiper>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials