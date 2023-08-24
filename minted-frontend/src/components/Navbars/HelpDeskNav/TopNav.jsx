import React from 'react';

const TopNav = () => {
  return (
    <div className="top-navbar style-11">
      <div className="container">
        <div className="content py-3 border-1 border-bottom brd-light">
          <div className="row">
            <div className="col-lg-6">
              <div className="links">
                <a href="#" className="me-4 color-999"> Product Support </a>
                <a href="#" className="me-4 color-999"> Company </a>
                <a href="#" className="me-4 color-999"> Contact us </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="top-nav-side">
                <div className="dropdown lang pe-4 me-4 border-1 border-end brd-light">
                  <a className="text-white dropdown-toggle" href="#" id="navbarDropdown2" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    English
                    {/* <!-- <small className="hot alert-danger text-danger">hot</small> --> */}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                    <li><a className="dropdown-item" href="#"> arabic </a></li>
                    <li><a className="dropdown-item" href="#"> frensh </a></li>
                  </ul>
                </div>
                <div className="social-links">
                  <p> Follow Us : </p>
                  <div className="social-content">
                    <a href="#"> <i className="fab fa-twitter"></i> </a>
                    <a href="#"> <i className="fab fa-facebook-f"></i> </a>
                    <a href="#"> <i className="fab fa-behance"></i> </a>
                    <a href="#"> <i className="fab fa-youtube"></i> </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav