import React, { useEffect, useRef } from 'react';
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
    <nav className="navbar navbar-expand-lg navbar-dark style-12" ref={navbarRef}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/assets/img/logo_12.png" alt="" />
        </a>
        <div className="nav-search d-none d-lg-block">
          <div className="form-group">
            <button className="icon" type="submit"> <i className="fal fa-search"></i> </button>
            <input type="text" className="form-control" placeholder="Search NFT" />
          </div>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse align-items-center" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto">
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
                  {/* <img src="//assets/img/icons/nav_icon/price.png" alt="" className="icon-15 me-1"> */}
                  contact
                </a>
              </Link>
            </li>
          </ul>
          <div className="nav-side mt-3 mt-lg-0">
            <div className="d-lg-flex align-items-center d-block">
              <div className="social-icons">
                <p> Connect Us : </p>
                <div className="icons">
                  <a href="#"> <i className="fab fa-twitter"></i> </a>
                  <a href="#"> <i className="fab fa-discord"></i> </a>
                  <a href="#"> <i className="fab fa-linkedin"></i> </a>
                </div>
              </div>
              <a href="#0" className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen ms-lg-4 mt-3 mt-lg-0" target="_blank">
                <small> <i className="fas fa-wallet me-1"></i> Connect Wallet </small>
              </a>
            </div>
          </div>
          <div className="nav-search d-block d-lg-none">
            <div className="form-group">
              <button className="icon" type="submit"> <i className="fal fa-search"></i> </button>
              <input type="text" className="form-control" placeholder="Search NFT" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar