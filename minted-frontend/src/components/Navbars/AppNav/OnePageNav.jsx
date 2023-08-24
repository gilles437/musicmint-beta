import { useEffect } from 'react';
import scrollToSection from '@common/scrollToSection';

const OnePageNav = ({ navbarRef, rtl }) => {
  useEffect(() => {
    const sections = document.querySelectorAll('[data-scroll-index]');

    window.addEventListener('scroll', () => {
      sections.forEach(section => {
        const index = section.getAttribute('data-scroll-index');
        const offset = section.offsetTop;
        const height = section.offsetHeight;
        const scroll = window.scrollY;

        if (scroll + 200 > offset && scroll + 200 < offset + height) {
          document.querySelector(`[data-scroll-nav="${index}"]`)?.classList?.add('active');
        } else {
          document.querySelector(`[data-scroll-nav="${index}"]`)?.classList?.remove('active');
        }
      });
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light style-4" id="main-nav" ref={navbarRef}>
      <div className="container">
        <a className="navbar-brand" href="#" data-scroll-nav="0" onClick={scrollToSection}>
          <img src="/assets/img/logo_lgr.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-uppercase">
            <li className="nav-item">
              <a className="nav-link" href="#0" data-scroll-nav="1" onClick={scrollToSection}>
                { rtl ? 'خدماتنا' : 'Featured' }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#0" data-scroll-nav="2" onClick={scrollToSection}>
                { rtl ? 'من نحن' : 'About' }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#0" data-scroll-nav="3" onClick={scrollToSection}>
                { rtl ? 'تطبيقات شائعة' : 'Popular Apps' }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#0" data-scroll-nav="4" onClick={scrollToSection}>
                { rtl ? 'شاشات التطبيق' : 'screens' }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#0" data-scroll-nav="5" onClick={scrollToSection}>
                { rtl ? 'اراء العملاء' : 'Testimonials' }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#0" data-scroll-nav="6" onClick={scrollToSection}>
                { rtl ? 'خطه الاسعار' : 'Pricing Plan' }
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#0" data-scroll-nav="7" onClick={scrollToSection}>
                { rtl ? 'اراء العملاء' : 'faq' }
              </a>
            </li>
          </ul>
          <div className="nav-side">
            <div className="d-flex align-items-center">
              <a href="#0" className="btn rounded-pill brd-gray hover-blue4 sm-butn fw-bold" data-scroll-nav="8" onClick={scrollToSection}>
                <span>{ rtl ? 'تحميل' : 'download' } <i className="bi bi-download ms-1"></i> </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default OnePageNav