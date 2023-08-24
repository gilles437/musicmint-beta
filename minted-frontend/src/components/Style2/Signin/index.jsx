import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Mousewheel } from 'swiper';

SwiperCore.use([Autoplay, Pagination, Mousewheel]);

import "swiper/css";
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';

const SignIn = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoad(true));
  }, []);

  return (
    <section className="signin style-5">
      <div className="container">
        <div className="form-content">
          <div className="row gx-0">
            <div className="col-lg-6 order-last order-lg-first">
              <div className="info">
                <a href="#" className="logo">
                  <img src="/assets/img/logo_foot_home5.png" alt="" />
                </a>
                <h3 className="mb-2"> Signup or Login To <span className="color-blue5"> Iteck </span> </h3>
                <p className="color-666"> Get started to login with other platform </p>
                <div className="sign-btns mt-30">
                  <a href="#" className="butn py-3 px-4 border-1 rounded-3 brd-gray border me-2">
                    <span> <i className="fab fa-google me-1 color-blue5"></i> Sign in with Google </span>
                  </a>
                  <a href="#" className="butn py-3 px-4 border-1 rounded-3 brd-gray border ms-1 mt-3 mt-lg-0">
                    <span> <i className="fab fa-apple me-1 color-blue5"></i> Sign in with Apple </span>
                  </a>
                </div>
                <div className="or-line">
                  <span> or </span>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group group-icon">
                      <input type="text" className="form-control" placeholder="Email address" />
                      <span className="icon"> <i className="fas fa-envelope"></i> </span>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group group-icon mt-3 mt-lg-0">
                      <input type="password" className="form-control" placeholder="Password" />
                      <span className="icon"> <i className="fas fa-key"></i> </span>
                    </div>
                  </div>
                </div>
                <button className="butn bg-main border-0 rounded-3 w-100 text-white mt-20 py-3">
                  <span> Sign In Now <i className="fal fa-long-arrow-right ms-2"></i> </span>
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sign-imgs-slider">
                {
                  load && (
                    <Swiper
                      className="swiper-container"
                      slidesPerView={1}
                      spaceBetween={0}
                      speed={1000}
                      pagination={{
                        el: ".sign-imgs-slider .swiper-pagination",
                        clickable: true,
                      }}
                      navigation={false}
                      mousewheel={false}
                      keyboard={true}
                      autoplay={{
                        delay: 4000,
                      }}
                      loop={true}
                    >
                      <SwiperSlide>
                        <div className="slide-card">
                          <h3> Welcome To Iteck <br /> Community </h3>
                          <div className="img">
                            <img src="/assets/img/login/1.png" alt="" />
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="slide-card">
                          <h3> Welcome To Iteck <br /> Community </h3>
                          <div className="img">
                            <img src="/assets/img/login/2.jpg" alt="" />
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="slide-card">
                          <h3> Welcome To Iteck <br /> Community </h3>
                          <div className="img">
                            <img src="/assets/img/login/3.png" alt="" />
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  )
                }
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignIn