import React from 'react'

const Footer = () => {
  return (
    <footer className="style-12">
      <div className="container">
        <div className="content">
          <div className="row">
            <div className="col-lg-4">
              <div className="foot-info">
                <div className="foot-logo mb-30">
                  <img src="/assets/img/logo_12.png" alt="" />
                </div>
                <p> The world’s first and largest digital NFT marketplace for crypto collectibles & non fungible tokens (NFTs). Buy, sell, & discover exclusive digital items. </p>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-2">
              <div className="links mt-5 mt-lg-0">
                <h6> Marketplace </h6>
                <ul>
                  <li> <a href="#"> Art </a> </li>
                  <li> <a href="#"> Collectibles </a> </li>
                  <li> <a href="#"> Domain Names </a> </li>
                  <li> <a href="#"> Music </a> </li>
                  <li> <a href="#"> Photography </a> </li>
                  <li> <a href="#"> Sports </a> </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="links mt-5 mt-lg-0">
                <h6> My Account </h6>
                <ul>
                  <li> <a href="#"> Profile </a> </li>
                  <li> <a href="#"> Favorites </a> </li>
                  <li> <a href="#"> Watchlist </a> </li>
                  <li> <a href="#"> My Collections </a> </li>
                  <li> <a href="#"> Settings </a> </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="links mt-5 mt-lg-0">
                <h6> Resources </h6>
                <ul>
                  <li> <a href="#"> Learn </a> </li>
                  <li> <a href="#"> Help Center </a> </li>
                  <li> <a href="#"> Platform Status </a> </li>
                  <li> <a href="#"> Partners </a> </li>
                  <li> <a href="#"> Taxes </a> </li>
                  <li> <a href="#"> Blog </a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="foot">
          <p> Copyright & Design By <a href="#" className="color-yellowGreen"> @ThemeCamp </a> - 2022 </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer