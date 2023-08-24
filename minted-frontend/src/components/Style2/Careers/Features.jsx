import features from '@data/Style2/features.json';

const Features = () => {
  return (
    <section className="careers-features pb-70">
      <div className="container">
        <div className="content">
          <div className="row">
            { 
              features.map((feature, index) => (
                <div className="col-lg-3 col-sm-6" key={index}>
                  <div className="careers-feat-card">
                    <div className="icon">
                      <img src={feature.icon} alt="" />
                    </div>
                    <div className="info">
                      <h4> { feature.title } </h4>
                      <p> { feature.description } </p>
                    </div>
                  </div>
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