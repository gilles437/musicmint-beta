import { useEffect, useRef } from 'react';
import Link from 'next/link';
import navbarScrollEffect from "@common/navbarScrollEffect";

const Navbar = ({ whiteNotRounded }) => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current);
  }, [navbarRef]);
  
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
    <nav className={`navbar navbar-expand-lg navbar-light style-6 ${whiteNotRounded ? 'bg-white rounded-0 position-relative' : ''}`} ref={navbarRef}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/assets/img/logo_home6.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                الرئيسية
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link href="/home-app-landing"><a className="dropdown-item">صفحة هبوط للتطبيق</a></Link></li>
                <li><Link href="/home-saas-technology"><a className="dropdown-item">التكنولوجى</a></Link></li>
                <li><Link href="/home-marketing-startup"><a className="dropdown-item">التسويق الالكترونى</a></Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                الصفحات الداخلية
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link href="/rtl-page-about"><a className="dropdown-item">من نحن</a></Link></li>
                <li><Link href="/rtl-page-product"><a className="dropdown-item">المنتجات</a></Link></li>
                <li><Link href="/rtl-page-services"><a className="dropdown-item">الخدمات</a></Link></li>
                <li><Link href="/rtl-page-shop"><a className="dropdown-item">المتجر</a></Link></li>
                <li><Link href="/rtl-page-single-project"><a className="dropdown-item">تفاصيل المشروع</a></Link></li>
                <li><Link href="/rtl-page-single-post"><a className="dropdown-item">تفاصيل الخبر</a></Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/rtl-page-portfolio">
                <a className="nav-link">
                  المشاريع
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/rtl-page-blog">
                <a className="nav-link">
                  المدونة
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/rtl-page-contact">
                <a className="nav-link">
                  اتصل بنا
                </a>
              </Link>
            </li>
          </ul>
          <div className="nav-side">
            <div className="d-flex align-items-center">
              <Link href="/rtl-page-contact">
                <a className="btn rounded-pill butn-blue6 hover-blue2 sm-butn fw-bold">
                  <span>
                    <i className="bi bi-chat-dots me-2"></i>
                    لنتحدث الأن !
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar