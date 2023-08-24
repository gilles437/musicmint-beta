import React from 'react'

const Contact = () => {
  return (
    <section className="contact style-5 section-padding">
      <div className="container">
        <div className="section-head text-center mb-80 style-5">
          <h2> Get In  <span> Touch </span> </h2>
          <p>
            More than 15,000 companies trust and choose Itech
          </p>
        </div>
        <div className="contact-form">
          <div className="row">
            <div className="col-lg-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Full name" />
                <span className="icon"> <i className="fas fa-user"></i> </span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Phone number" />
                <span className="icon"> <i className="fas fa-phone"></i> </span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Email address" />
                <span className="icon"> <i className="fas fa-envelope"></i> </span>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group">
                <textarea rows="6" placeholder="Message" className="form-control"></textarea>
                <span className="icon"> <i className="fas fa-pen"></i> </span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <a href="#" className="butn bg-blue5 rounded-3 mt-20 py-3 text-white">
              <span> Make A Request <i className="far fa-long-arrow-right ms-2"></i> </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact