import { useEffect } from 'react';
import scrollToSection from '@common/scrollToSection';

const OnePageNav = ({ navbarRef }) => {
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

  return (
    <nav className="navbar navbar-expand-lg navbar-light style-5" ref={navbarRef}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" data-scroll-nav="0" onClick={scrollToSection}>
          <img src="/assets/img/logo_home5.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link" data-scroll-nav="1" onClick={scrollToSection}>
                about us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="2" onClick={scrollToSection}>
                clients
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="3" onClick={scrollToSection}>
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="4" onClick={scrollToSection}>
                pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="5" onClick={scrollToSection}>
                testimonials
              </a>
            </li>
          </ul>
          <div className="nav-side">
            <div className="d-flex align-items-center">
              <a href="#0" className="btn rounded-pill blue5-3Dbutn hover-blue2 sm-butn fw-bold" data-scroll-nav="6">
                <span>download app <i className="bi bi-download ms-1"></i> </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default OnePageNav