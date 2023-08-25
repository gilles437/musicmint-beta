import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import navbarScrollEffect from "@common/navbarScrollEffect";
import ConnectContainer from './ConnectContainer';

import dynamic from 'next/dynamic';

// const ConnectContainer = dynamic(() => import('./ConnectContainer').then(m => m.Connect), {
//   ssr: false,
// });

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
                <li><Link href="/" className="dropdown-item"> Landing Preview </Link></li>
                <li><Link href="/home-it-solutions2" className="dropdown-item"> Creative It Solutions </Link></li>
                <li><Link href="/home-data-analysis" className="dropdown-item"> Data Analysis </Link></li>
                <li><Link href="/home-app-landing" className="dropdown-item"> App Landing </Link></li>
                <li><Link href="/home-saas-technology" className="dropdown-item"> Saas Technology </Link></li>
                <li><Link href="/home-marketing-startup" className="dropdown-item"> Marketing Startup </Link></li>
                <li><Link href="/home-it-solutions" className="dropdown-item"> It Solution </Link></li>
                <li><Link href="/home-software-company" className="dropdown-item"> Software Company </Link></li>
                <li><Link href="/home-digital-agency" className="dropdown-item"> Digital Agency </Link></li>
                <li><Link href="/home-modren-shop" className="dropdown-item"> Modren Shop </Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                pages
                {/* <!-- <small className="hot alert-danger text-danger">hot</small> --> */}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><Link href="/page-about-app" className="dropdown-item">about</Link></li>
                <li><Link href="/page-product-app" className="dropdown-item">product</Link></li>
                <li><Link href="/page-services-app" className="dropdown-item">services</Link></li>
                <li><Link href="/page-shop-app" className="dropdown-item">shop</Link></li>
                <li><Link href="/page-single-project-app" className="dropdown-item">single project</Link></li>
                <li><Link href="/page-single-post-app" className="dropdown-item">single post</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/page-portfolio-app" className="nav-link">
                  portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page-blog-app" className="nav-link">
                  blog
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page-contact-app" className="nav-link">
                  {/* <img src="//assets/img/icons/nav_icon/price.png" alt="" className="icon-15 me-1"> */}
                  contact
              </Link>
            </li>
          </ul>
          <div className="nav-side mt-3 mt-lg-0">
            <div className="d-lg-flex align-items-center d-block">
              <div className="social-icons">
                {/* <p> Connect Us : </p> */}
                <div className="icons">
                  <a href="#"> <i className="fab fa-twitter"></i> </a>
                  <a href="#"> <i className="fab fa-discord"></i> </a>
                  <a href="#"> <i className="fab fa-linkedin"></i> </a>
                </div>
              </div>
              <div className="ms-lg-4 mt-3 mt-lg-0">
                <ConnectContainer />
              </div>
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