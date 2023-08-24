import React from 'react'

const TopNav = () => {
  const handleMouseMove = (event) => {
    const dropDownToggler = event.target.classList.contains('dropdown-toggle') ? event.target : event.target.querySelector('.dropdown-toggle');
    const dropDownMenu = dropDownToggler?.nextElementSibling;

    dropDownToggler?.classList?.add('show');
    dropDownMenu?.classList?.add('show');
  }

  const handleMouseLeave = (event) => {
    const dropdown = event.target.classList.contains('dropdown') ? event.target : event.target.closest('.dropdown');
    const dropDownToggler = dropdown.querySelector('.dropdown-toggle');
    const dropDownMenu = dropdown.querySelector('.dropdown-menu');

    dropDownToggler?.classList?.remove('show');
    dropDownMenu?.classList?.remove('show');
  }

  return (
    <div className="top-navbar style-9">
      <div className="container">
        <div className="row justify-content-between align-items-center gx-0">
          <div className="col-7">
            <div className="top_info">
              <a href="#" className="me-4">
                <i className="fas fa-envelope-open me-1"></i>
                <span>info@iteck-tech</span>
              </a>
              <a href="#">
                <i className="fas fa-phone me-1"></i>
                <span>+89 (000) 786 999</span>
              </a>
            </div>
          </div>
          <div className="col-5">
            <div className="side_links d-flex justify-content-lg-end">
              <a href="#" className="me-4"> Careers </a>
              <a href="#" className="me-4"> Faq </a>
              <div className="dropdown border-1 border-start ps-4" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <a className="dropdown-toggle fw-bold" href="#" id="navbarDropdown1" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  English
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li><a className="dropdown-item" href="#0"> Arabic </a></li>
                  <li><a className="dropdown-item" href="#0"> french </a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav