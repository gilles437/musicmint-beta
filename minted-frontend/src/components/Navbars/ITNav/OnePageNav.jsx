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
        let offset = section.offsetTop;
        const height = section.offsetHeight;
        const scroll = window.scrollY;

        if (section.getAttribute('data-scroll-internal-section') === 'true') {
          offset = section.offsetTop + section.parentElement.offsetTop;
        }

        if (scroll + 200 > offset && scroll + 200 < offset + height) {
          document.querySelector(`[data-scroll-nav="${index}"]`).classList.add('active');
        } else {
          document.querySelector(`[data-scroll-nav="${index}"]`).classList.remove('active');
        }
      });
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark style-2 position-absolute w-100 p-0" ref={navbarRef}>
      <div className="container">
        <a className="navbar-brand" href="#" data-scroll-nav="0" onClick={scrollToSection}>
          <img src="/assets/img/logo_ll.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-uppercase">
            <li className="nav-item dropdown">
              <a className="nav-link" data-scroll-nav="1" onClick={scrollToSection}>
                about us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="2" onClick={scrollToSection}>
                services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="3" onClick={scrollToSection}>
                portfolio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="4" onClick={scrollToSection}>
                why us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="5" onClick={scrollToSection}>
                testimonials
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="6" onClick={scrollToSection}>
                pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="7" onClick={scrollToSection}>
                blog
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default OnePageNav