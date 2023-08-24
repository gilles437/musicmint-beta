import Link from 'next/link';
import appData from '@data/appData.json';

const PreviewNavbar = ({ navbarRef }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light style-1 nav-preview py-0" ref={navbarRef}>
      <div className="container-xxl">
        <a className="navbar-brand" href="#">
          <img src="/assets/img/logo_cd.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item dropDown megaMenu col3">
              <a className="nav-links dropLink active" href="#">
                Homes
                <small className="icon ms-1"><i className="bi bi-chevron-down me-1"></i></small>
              </a>
              <ul className="dropDownMenu">
                <li className="dropdown-items">
                  <a href="#" className="menuLink">multi-pages</a>
                  <ul className="subDropDown">
                    <li>
                      <Link href="/home-it-solutions2">
                        <a className="subLink">IT Solution Creative</a>
                      </Link>
                      <span className="new">new</span>
                    </li>
                    <li>
                      <Link href="/home-data-analysis">
                        <a className="subLink">Data Analysis</a>
                      </Link>
                      <span className="new">new</span>
                    </li>
                    <li>
                      <Link href="/home-app-landing">
                        <a className="subLink">App Landing</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home-digital-agency">
                        <a className="subLink">Digital Agency</a>
                      </Link>
                      <span className="new">Hot</span>
                    </li>
                    <li>
                      <Link href="/home-marketing-startup">
                        <a className="subLink">Marketing Startup</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home-saas-technology">
                        <a className="subLink">Software company</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home-saas-technology">
                        <a className="subLink">Saas Technology</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home-it-solutions">
                        <a className="subLink">IT Solution</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-shop-5">
                        <a className="subLink">shop</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-items">
                  <a href="#" className="menuLink">one-page</a>
                  <ul className="subDropDown">
                    <li>
                      <Link href="/home-app-landing-onePage">
                        <a className="subLink">App Landing</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home-digital-agency-onePage">
                        <a className="subLink">Digital Agency</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home-marketing-startup-onePage">
                        <a className="subLink">Marketing Startup</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home-saas-technology-onePage">
                        <a className="subLink">Software company</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home-saas-technology-onePage">
                        <a className="subLink">Saas Technology</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home-it-solutions-onePage">
                        <a className="subLink">IT Solution</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-shop-app">
                        <a className="subLink">shop</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-items">
                  <a href="#" className="menuLink">RTL</a>
                  <ul className="subDropDown">
                    <li>
                      <Link href="/rtl-home-marketing-startup">
                        <a className="subLink">Marketing Startup</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/rtl-home-marketing-startup-onePage">
                        <a className="subLink">Marketing Startup one page</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/rtl-page-shop">
                        <a className="subLink">shop</a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item dropDown megaMenu col3">
              <a className="nav-links dropLink active" href="#">
                pages
                <small className="icon ms-1"><i className="bi bi-chevron-down me-1"></i></small>
              </a>
              <ul className="dropDownMenu">
                <li className="dropdown-items">
                  <a href="#" className="menuLink">app pages</a>
                  <ul className="subDropDown">
                    <li>
                      <Link href="/page-about-app">
                        <a className="subLink">about</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-services-app">
                        <a className="subLink">services</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-contact-app">
                        <a className="subLink">contact</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-product-app">
                        <a className="subLink">product</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-items">
                  <a href="#" className="menuLink">Saas</a>
                  <ul className="subDropDown">
                    <li>
                      <Link href="/page-about-5">
                        <a className="subLink">about</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-services-5">
                        <a className="subLink">services</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-contact-5">
                        <a className="subLink">contact</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-product-5">
                        <a className="subLink">product</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-items">
                  <a href="#" className="menuLink">RTL</a>
                  <ul className="subDropDown">
                    <li>
                      <Link href="/rtl-page-about">
                        <a className="subLink">about</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/rtl-page-services">
                        <a className="subLink">services</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/rtl-page-contact">
                        <a className="subLink">contact</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/rtl-page-product">
                        <a className="subLink">product</a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item dropDown megaMenu col3">
              <a className="nav-links dropLink active" href="#">
                News
                <small className="icon ms-1"><i className="bi bi-chevron-down me-1"></i></small>
              </a>
              <ul className="dropDownMenu">
                <li className="dropdown-items">
                  <a href="#" className="menuLink">blog</a>
                  <ul className="subDropDown">
                    <li>
                      <Link href="/page-blog-5">
                        <a className="subLink">saas right side bar blog</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-blog-5-left-sidebar">
                        <a className="subLink">saas left side bar blog</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-blog-5-wide">
                        <a className="subLink">saas wide blog</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-blog-app">
                        <a className="subLink">app right side bar blog</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-blog-app-left-sidebar">
                        <a className="subLink">app left side bar blog</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-blog-app-wide">
                        <a className="subLink">app wide blog</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/rtl-page-blog">
                        <a className="subLink">RTL blog</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-items">
                  <a href="#" className="menuLink">post</a>
                  <ul className="subDropDown">
                    <li>
                      <Link href="/page-single-post-5">
                        <a className="subLink">Saas right side bar single post</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-single-post-5-left-sidebar">
                        <a className="subLink">Saas left side bar single post</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-single-post-5-wide">
                        <a className="subLink">Saas wide single post</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-single-post-app">
                        <a className="subLink">app right side bar single post</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-single-post-app-left-sidebar">
                        <a className="subLink">app left side bar single post</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-single-post-app-wide">
                        <a className="subLink">app wide single post</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/rtl-page-single-post">
                        <a className="subLink">RTL single post</a>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="dropdown-items">
                  <a href="#" className="menuLink">portfolio</a>
                  <ul className="subDropDown">
                    <li>
                      <Link href="/page-portfolio-5">
                        <a className="subLink">Saas grid portfolio</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-single-project-5">
                        <a className="subLink">Saas single project</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-portfolio-app">
                        <a className="subLink">app grid portfolio</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/page-single-project-app">
                        <a className="subLink">app single project</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/rtl-page-portfolio">
                        <a className="subLink">RTL portfolio</a>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-links dropLink" href={appData.itemDocsLink}>
                documentations
              </a>
            </li>
          </ul>
          <div className="nav-side flex-shrink-0">
            <div className="qoute-nav">
              <a href="#0" className="btn sm-butn butn-gard border-0 text-white">
                <span>get started</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default PreviewNavbar