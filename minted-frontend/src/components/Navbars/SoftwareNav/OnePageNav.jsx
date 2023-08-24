import { useEffect, useRef } from 'react';
import navbarScrollEffect from "@common/navbarScrollEffect";
import scrollToSection from '@common/scrollToSection';

const OnePageNav = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current);
  }, [navbarRef]);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-scroll-index]');

    window.addEventListener('scroll', () => {
      sections.forEach(section => {
        const index = section.getAttribute('data-scroll-index');
        const offset = section.offsetTop;
        const height = section.offsetHeight;
        const scroll = window.scrollY;

        if (scroll + 200 > offset && scroll + 200 < offset + height) {
          document.querySelector(`[data-scroll-nav="${index}"]`).classList.add('active');
        } else {
          document.querySelector(`[data-scroll-nav="${index}"]`).classList.remove('active');
        }
      });
    });
  }, []);

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
    <nav className="navbar navbar-expand-lg navbar-dark style-3 position-absolute w-100" ref={navbarRef}>
      <div className="container">
        <a className="navbar-brand" href="#0" data-scroll-nav="0" onClick={scrollToSection}>
          <img src="/assets/img/logo_ll.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-uppercase">
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="1" onClick={scrollToSection}>
                testimonials
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="2" onClick={scrollToSection}>
                services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="3" onClick={scrollToSection}>
                about us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="4" onClick={scrollToSection}>
                portfolio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="5" onClick={scrollToSection}>
                pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="6" onClick={scrollToSection}>
                team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="7" onClick={scrollToSection}>
                blog
              </a>
            </li>
          </ul>
          <div className="nav-side">
            <div className="d-flex ps-4">
              <a href="#" className="search-icon me-5">
                <i className="bi bi-search"></i>
              </a>
              <div className="dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <button
                  className="icon-35 dropdown-toggle p-0 border-0 bg-transparent rounded-circle img-cover text-white"
                  type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/assets/img/lang.png" alt="" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a className="dropdown-item" href="#">English</a></li>
                  <li><a className="dropdown-item" href="#">Arabic</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default OnePageNav