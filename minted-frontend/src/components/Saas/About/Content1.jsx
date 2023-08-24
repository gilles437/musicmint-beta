import React from 'react'

const Content = ({ links, rtl }) => {
  return (
    <div className="content">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 order-2 order-lg-0">
            <div className="section-head mb-30 style-5">
              <h2>{ rtl ? 'تجارب المستخدم ' : 'Optimized User' } <span>{ rtl ? 'المحسّنة' : 'Experiences' }</span> </h2>
            </div>
            <p>{ rtl ? 'يمكن تبسيط عمليات التحميل والتحديث التي يقوم بها الموردون من خلال لوحات المعلومات الأمامية التي توفر سهولة الوصول بشكل أفضل.' : 'The uploading and updating processes made by suppliers can be streamlined through front-end dashboards that create better ease of access.' }</p>
            <div className="line-links">
              {
                links.map((link, index) => (<a href="#" key={index}>{ link }</a>))
              }
            </div>
          </div>
          <div className="col-lg-8 order-0 order-lg-2">
            <div className="img main-img1">
              <img src="/assets/img/about/about_s5_1_1.png" alt="" className="sm-circle" />
              <img src="/assets/img/about/about_s5_1_2.png" alt="" className="img-body" />
              <img src="/assets/img/about/about_s5_1_3.png" alt="" className="card1" />
              <img src="/assets/img/about/about_s5_1_4.png" alt="" className="card2" />
              <img src="/assets/img/about/about_s5_1_5.png" alt="" className="lg-circle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content