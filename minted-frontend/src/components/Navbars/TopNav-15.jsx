import React from 'react'

const TopNav15 = () => {
  return (
    <div className="top-navbar style-15">
      <div className="container">
        <div className="row justify-content-between align-items-center gx-0">
          <div className="col-6">
            <span> Follow Us : </span>
            <a href="#"> <i className="fab fa-facebook-f ms-2"></i> </a>
            <a href="#"> <i className="fab fa-twitter ms-2"></i> </a>
            <a href="#"> <i className="fab fa-behance ms-2"></i> </a>
            <a href="#"> <i className="fab fa-youtube ms-2"></i> </a>
            <a href="#"> <i className="fab fa-discord ms-2"></i> </a>
          </div>
          <div className="col-6">
            <div className="side_links d-flex justify-content-lg-end">
              <a href="#" className="ms-4"> Login/Sign Up </a>
              <a href="#" className="ms-4"> Careers </a>
              <a href="#" className="ms-4"> Faq </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav15