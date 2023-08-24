import { useEffect, useRef } from 'react';
import Link from 'next/link';
import navbarScrollEffect from "@common/navbarScrollEffect";

const Navbar = () => {
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

  const toggleSideMenu = (e) => {
    e.preventDefault();

    document.querySelector('.side_menu_btn').classList.toggle('active');
    
    const side_menu = document.getElementById('side_menu');
    const side_overlay = document.querySelector('.side_overlay');

    side_menu && side_menu.classList.toggle('show');
    side_overlay && side_overlay.classList.toggle('show');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark style-9" ref={navbarRef}>
      <div className="container content">
        <a className="navbar-brand" href="#">
          <img src="/assets/img/logo_9.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 ps-4">
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdown1" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Homes
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link href="/"><a className="dropdown-item"> Landing Preview </a></Link></li>
                <li><Link href="/home-it-solutions2"><a className="dropdown-item"> Creative It Solutions </a></Link></li>
                <li><Link href="/home-data-analysis"><a className="dropdown-item"> Data Analysis </a></Link></li>
                <li><Link href="/home-app-landing"><a className="dropdown-item"> App Landing </a></Link></li>
                <li><Link href="/home-saas-technology"><a className="dropdown-item"> Saas Technology </a></Link></li>
                <li><Link href="/home-marketing-startup"><a className="dropdown-item"> Marketing Startup </a></Link></li>
                <li><Link href="/home-it-solutions"><a className="dropdown-item"> It Solution </a></Link></li>
                <li><Link href="/home-software-company"><a className="dropdown-item"> Software Company </a></Link></li>
                <li><Link href="/home-digital-agency"><a className="dropdown-item"> Digital Agency </a></Link></li>
                <li><Link href="/home-modren-shop"><a className="dropdown-item"> Modren Shop </a></Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                pages
                {/* <!-- <small className="hot alert-danger text-danger">hot</small> --> */}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link href="/page-about-app"><a className="dropdown-item">about</a></Link></li>
                <li><Link href="/page-product-app"><a className="dropdown-item">product</a></Link></li>
                <li><Link href="/page-services-app"><a className="dropdown-item">services</a></Link></li>
                <li><Link href="/page-shop-app"><a className="dropdown-item">shop</a></Link></li>
                <li><Link href="/page-single-project-app"><a className="dropdown-item">single project</a></Link></li>
                <li><Link href="/page-single-post-app"><a className="dropdown-item">single post</a></Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/page-portfolio-app">
                <a className="nav-link">
                  portfolio
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page-blog-app">
                <a className="nav-link">
                  blog
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page-contact-app">
                <a className="nav-link">
                  contact
                </a>
              </Link>
            </li>
          </ul>
          <div className="nav-side">
            <div className="d-flex align-items-center">
              <a href="#" className="me-4">
                <img src="/assets/img/icons/cart_light.png" alt="" />
              </a>
              <a href="#0" className="me-4">
                <img src="/assets/img/icons/user_light.png" alt="" />
              </a>
              <a href="#0" className="side_menu_btn" onClick={toggleSideMenu}>
                <img src="/assets/img/icons/4dots_light.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;