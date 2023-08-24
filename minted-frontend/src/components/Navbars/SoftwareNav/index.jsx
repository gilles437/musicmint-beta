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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark style-3 position-absolute w-100" ref={navbarRef}>
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="/assets/img/logo_ll.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-uppercase">
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                pages
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link href="/page-about-5"><a className="dropdown-item">about</a></Link></li>
                <li><Link href="/page-product-5"><a className="dropdown-item">product</a></Link></li>
                <li><Link href="/page-services-5"><a className="dropdown-item">services</a></Link></li>
                <li><Link href="/page-shop-5"><a className="dropdown-item">shop</a></Link></li>
                <li><Link href="/page-single-project-5"><a className="dropdown-item">single project</a></Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/page-portfolio-5">
                <a className="nav-link">
                  portfolio
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page-blog-5">
                <a className="nav-link">
                blog
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page-contact-5">
                <a className="nav-link">
                  contact
                </a>
              </Link>
            </li>
          </ul>
          <div className="nav-side">
            <div className="d-flex ps-4">
              <a href="#" className="search-icon me-5">
                <i className="bi bi-search"></i>
              </a>
              <div className="dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <button className="icon-35 dropdown-toggle p-0 border-0 bg-transparent rounded-circle img-cover text-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
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

export default Navbar