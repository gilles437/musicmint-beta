import React from 'react'

const TopNav = () => {
  return (
    <div className="top-navbar style-8 d-none d-lg-block">
      <div className="container">
        <div className="content bg-white py-2 px-4 rounded-pill">
          <div className="row">
            <div className="col-lg-6">
              <p>  Offer is going on till friday, <a href="#" className="color-main"> $1.99/mo.  </a> </p>
            </div>
            <div className="col-lg-6">
              <div className="text-lg-end">
                <p className="color-999"> Get Support: <a href="callto:+809 (000) 888 99" className="color-000"> +809 (000) 888 99 </a> </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav