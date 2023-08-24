import Link from 'next/link';

const Navbar = ({ navbarRef, bgTransparent }) => {
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
    <nav className={`navbar navbar-expand-lg navbar-light style-5 ${bgTransparent ? 'bg-transparent':''}`} ref={navbarRef}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/assets/img/logo_home5.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
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
                  <small className="fs-10px icon-20 rounded-pill bg-blue5 text-white fw-bold px-3 ms-2 d-inline-flex justify-content-center align-items-center">3</small>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page-contact-5">
                <a className="nav-link">
                  contact us
                </a>
              </Link>
            </li>

          </ul>
          <div className="nav-side">
            <div className="d-flex align-items-center">
              <span className="nav-item">
                <Link href="/page-contact-5">
                  <a className="nav-link">
                    <i className="bi bi-person fs-5 me-2"></i>
                    sign in
                  </a>
                </Link>
              </span>
              <Link href="/page-contact-5">
                <a className="btn rounded-pill blue5-3Dbutn hover-blue2 sm-butn fw-bold">
                  <span>Start Free Trial <i className="bi bi-arrow-right ms-1"></i> </span>
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