import features from '@data/Saas/features.json';
import featuresRTL from '@data/Saas/features-rtl.json';

const Features = ({ isServices, rtl }) => {
  const featuresData = rtl ? featuresRTL : features;

  return (
    <section className={`features section-padding style-5 ${isServices ? 'pt-50':'bg-gray5'}`} data-scroll-index="3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {
              isServices ? 
              (
                <div className="section-head text-center mb-60 style-5">
                  <h2 className="mb-20">{ rtl ? '' : 'Our' } <span>{ rtl ? 'خدماتنا' : 'Services' }</span></h2>
                  <p>
                    { rtl ? 'نحن نقدم حلول تكنولوجيا المعلومات المثالية لعملك' : 'We provide perfect IT Solutions for your business' }
                  </p>
                </div>
              )
              :
              (
                <div className="section-head text-center mb-60 style-5">
                  <h2 className="mb-20">Other Awesome <span>Features</span></h2>
                  <p>
                    Iteck Dashboard is a powerhouse when it comes to the feature list. This ensures you have every functionality you need to build, run, and expand your marketplace
                  </p>
                </div>
              )
            }
          </div>
        </div>
        <div className="content">
          <div className="row">
            {
              featuresData.map((feature, i) => (
                <div className="col-lg-3 col-sm-6" key={i}>
                  <a href="#" className="features-card mb-30 style-5">
                    <div className="icon">
                      <img src={feature.image} alt="" />
                    </div>
                    <div className="info">
                      <h5 className="card-title">
                        { feature.title }
                      </h5>
                      <p className="text">
                        { feature.descripition }
                      </p>
                    </div>
                  </a>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features