import { useEffect, useRef } from 'react';
import navbarScrollEffect from "@common/navbarScrollEffect";
import scrollToSection from '@common/scrollToSection';

const OnePageNav = ({ rtl }) => {
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

  return (
    <nav className="navbar navbar-expand-lg navbar-light style-6" ref={navbarRef}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" data-scroll-nav="0" onClick={scrollToSection}>
          <img src="/assets/img/logo_home6.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-scroll-nav="1" onClick={scrollToSection}>
                { rtl ? "من نحن" : "about us" }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="2" onClick={scrollToSection}>
                { rtl ? "خدماتنا" : "services" }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="3" onClick={scrollToSection}>
                { rtl ? "مشاريعنا" : "portfolio" }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="4" onClick={scrollToSection}>
                { rtl ? "لماذا نحن" : "why us" }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="5" onClick={scrollToSection}>
                { rtl ? "اراء العملاء" : "testimonials" }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="6" onClick={scrollToSection}>
                { rtl ? "عملائنا" : "clients" }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="7" onClick={scrollToSection}>
                { rtl ? "فريق العمل" : "team" }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-scroll-nav="8" onClick={scrollToSection}>
                { rtl ? "المدونة" : "blog" }
              </a>
            </li>
          </ul>
          <div className="nav-side">
            <div className="d-flex align-items-center">
              <a href="#0" className="btn rounded-pill butn-blue6 hover-blue2 sm-butn fw-bold" data-scroll-nav="9" onClick={scrollToSection}>
                <span>
                  <i className="bi bi-chat-dots me-2"></i>
                   { rtl ? "لنتحدث الأن !" : "Let’s Chat!" }
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default OnePageNav