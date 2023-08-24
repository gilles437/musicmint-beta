import Link from 'next/link';

const Header = () => {
  return (
    <header className="style-5" data-scroll-index="0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="info">
              <h1>All-in-one dashboard for
                <span>
                  eCommerce
                  <img src="/assets/img/header/head5_line.png" alt="" className="head-line" />
                  <img src="/assets/img/header/head5_pen.png" alt="" className="head-pen" />
                </span>
              </h1>
              <p>Iteck helps you unify your brand identity by collecting, storing and distributing <br /> design tokens and assets — automatically.</p>
              <form action="contact.php" className="form" method="post">
                <div className="form-group">
                  <span className="icon">
                    <i className="far fa-envelope"></i>
                  </span>
                  <input type="text" placeholder="Your email address" />
                  <Link href="/page-contact-5">
                    <a className="btn rounded-pill bg-blue5 hover-blue2 sm-butn fw-bold text-white">
                      <span>Start Free Trial <i className="bi bi-arrow-right ms-1"></i> </span>
                    </a>
                  </Link>
                </div>
              </form>
              <div className="main-img">
                <img src="/assets/img/header/header5_page.png" alt="" className="page-img" />
                <img src="/assets/img/header/header5_linechart.png" alt="" className="linechart-img" />
                <img src="/assets/img/header/header5_piechart.png" alt="" className="piechart-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="/assets/img/header/header5_handl.png" alt="" className="handl-img" />
      <img src="/assets/img/header/header5_handr.png" alt="" className="handr-img" />
    </header>
  )
}

export default Header