import Link from 'next/link';

const Navbar = ({ navbarRef }) => {
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
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent style-5" ref={navbarRef}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/assets/img/logo_home5.png" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link active dropdown-toggle" href="#" id="navbarDropdown1" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Homes
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><a className="dropdown-item" href="#">Home 1</a></li>
                <li><a className="dropdown-item" href="#">Home 2</a></li>
                <li><a className="dropdown-item" href="#">Home 3</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Features
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><a className="dropdown-item" href="#">Features 1</a></li>
                <li><a className="dropdown-item" href="#">Features 2</a></li>
                <li><a className="dropdown-item" href="#">Features 3</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Reviews
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                <li><a className="dropdown-item" href="#">Reviews 1</a></li>
                <li><a className="dropdown-item" href="#">Reviews 2</a></li>
                <li><a className="dropdown-item" href="#">Reviews 3</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Jobs
                <small
                  className="fs-10px icon-20 rounded-pill bg-blue5 text-white fw-bold px-3 ms-2 d-inline-flex justify-content-center align-items-center">3</small>
              </a>
            </li>
          </ul>
          <div className="nav-side">
            <div className="d-flex align-items-center">
              <span className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-person fs-5 me-2"></i>
                  sign in
                </a>
              </span>
              <a href="#" className="btn rounded-pill blue5-3Dbutn hover-blue5 sm-butn fw-bold">
                <span>Start Free Trial <i className="bi bi-arrow-right ms-1"></i> </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar