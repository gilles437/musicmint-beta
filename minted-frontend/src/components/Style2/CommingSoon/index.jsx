import { useEffect } from 'react';
import timer from '@common/timer';

const CommingSoon = () => {
  useEffect(() => {
    setTimeout(() => {
      timer('Oct 29, 2022 11:30');
    });
  }, [])

  return (
    <section className="comming-soon style-5">
      <div className="container">
        <div className="content">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="info">
                <div className="timing">
                  <div className="item">
                    <h2 id="days"></h2>
                    <small> days </small>
                  </div>
                  <div className="item">
                    <h2 id="hours"></h2>
                    <small> Hours </small>
                  </div>
                  <div className="item">
                    <h2 id="minutes"></h2>
                    <small> Minute </small>
                  </div>
                  <div className="item">
                    <h2 id="seconds"></h2>
                    <small> Seconds </small>
                  </div>
                </div>
                <h3> We Are Coming Very Soon </h3>
                <p> Perfect & awesome template to present your future website design. Hooking audience attention in the opener. </p>
                <div className="subscribe-form">
                  <div className="form-group">
                    <span className="icon"> <i className="fas fa-envelope"></i> </span>
                    <input type="text" placeholder="Business email address" className="form-control" />
                    <button className="butn bg-blue5 rounded-pill py-3 text-white flex-shrink-0 border-0" type="submit"> <span> Subscribe Now <i className="fas fa-long-arrow-right ms-2"></i> </span> </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="/assets/img/comming_man_shape.png" alt="" className="comming_man_shape slide_up_down" />
      <img src="/assets/img/comming_chat_shape.png" alt="" className="comming_chat_shape slide_up_down" />
      <img src="/assets/img/comming_light_shape.png" alt="" className="comming_light_shape slide_up_down" />
    </section>
  )
}

export default CommingSoon