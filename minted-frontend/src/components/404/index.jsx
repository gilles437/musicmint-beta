import React from 'react'

const NotFound = () => {
  return (
    <section className="erorr-page style-5">
      <div className="container">
        <div className="content">
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="info">
                <div className="icon">
                  <img src="/assets/img/icons/rocket.png" alt="" />
                </div>
                <h2 className="mb-30"> Opps! Looks Like Here is Nothing. </h2>
                <p className="color-777"> The page you’re looking for isn’t found. We suggest you back to home. It’s easy... </p>
                <a href="#" className="btn rounded-pill blue5-3Dbutn hover-blue2 sm-butn fw-bold mt-40">
                  <span> <i className="fas fa-long-arrow-left me-2"></i> Back To Home </span>
                </a>
              </div>
            </div>
            <div className="col-lg-8 text-lg-end">
              <div className="img">
                <img src="/assets/img/404_1.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound