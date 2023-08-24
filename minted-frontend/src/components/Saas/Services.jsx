import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import services from '@data/Saas/services.json';
import servicesRTL from '@data/Saas/services-rtl.json';

import "swiper/css";

const Services = ({ rtl }) => {
  const servicesData = rtl ? servicesRTL : services;

  return (
    <section className="services section-padding bg-white pb-50 style-6">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-head text-center mb-60 style-5">
              <h2 className="mb-20">{ rtl ? 'اهم' : 'Our Top' } <span>{ rtl ? 'خدماتنا' : 'Services' }</span> </h2>
              <p>
                { rtl ? 'تعتبر Iteck لوحة تحكم مصدر قوة عندما يتعلق الأمر بقائمة الميزات. يضمن ذلك حصولك على كل الوظائف التي تحتاجها لبناء سوقك وتشغيله وتوسيعه' : 'Iteck Dashboard is a powerhouse when it comes to the feature list. This ensures you have every functionality you need to build, run, and expand your marketplace' }
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="services-slider position-relative style-6">
          <Swiper
            className="swiper-container"
            slidesPerView={6}
            centeredSlides={true}
            spaceBetween={0}
            speed={1000}
            pagination={false}
            navigation={false}
            mousewheel={false}
            keyboard={true}
            autoplay={{
              delay: 4000
            }}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 1
              },
              480: {
                slidesPerView: 1
              },
              787: {
                slidesPerView: 2
              },
              991: {
                slidesPerView: 4
              },
              1200: {
                slidesPerView: 6
              }
            }}
          >
            {
              servicesData.map((service, index) => (
                <SwiperSlide key={index}>
                  <Link href="/page-services-5">
                    <a className="service-card style-6">
                      <div className="icon">
                        <img src={service.img} alt="" />
                      </div>
                      <div className="info">
                        <h5>{ service.info }</h5>
                        <div className="text">
                          { service.text }
                        </div>
                      </div>
                    </a>
                  </Link>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Services