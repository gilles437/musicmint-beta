import React from 'react'

const Content = ({ texts, number, rtl }) => {
  return (
    <div className="content pb-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 order-2 order-lg-0">
            <div className="section-head mb-30 style-5">
              <h2>{ rtl ? 'سهل' : 'Easy To' } <span>{ rtl ? 'التخصيص' : 'Customizable' }</span> </h2>
            </div>
            <p>
              { texts.text1 }
            </p>
            <p className="mt-20">
              { texts.text2 }
            </p>
            <div className="d-flex align-items-center mt-70">
              <div className="img me-2 flex-shrink-0">
                <img src="/assets/img/about/owners.png" alt="" />
              </div>
              <div className="inf">
                <h4 className="color-blue5 mb-0 lh-1">{ number }</h4>
                <p>{ rtl ? 'أصحاب السوق يثقون بنا' : 'Marketplace Owners Trust Us' }</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8 order-0 order-lg-2">
            <div className="img main-img3">
              <img src="/assets/img/about/about_s5_3_1.png" alt="" className="img-body" />
              <img src="/assets/img/about/about_s5_3_2.png" alt="" />
              <img src="/assets/img/about/about_s5_3_3.png" alt="" />
              <img src="/assets/img/about/about_s5_3_4.png" alt="" />
              <img src="/assets/img/about/about_s5_3_5.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content