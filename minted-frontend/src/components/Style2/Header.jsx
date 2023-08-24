import React from 'react'

const Header = ({ page, title }) => {
  return (
    <section className="inner-header style-5">
      <div className="container">
        <div className="content">
          <div className="links">
            <a href="#"> Home </a>
            <a href="#" className="ms-1"> { page } </a>
          </div>
          <h2> { title } </h2>
          <img src="/assets/img/header/head7_rock.png" alt="" className="side-img slide_up_down" />
        </div>
      </div>
    </section>
  )
}

export default Header