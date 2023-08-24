import positions from '@data/Style2/positions.json';

const Positions = () => {
  return (
    <section className="careers-positions pb-100">
      <div className="container">
        <div className="section-head text-center mb-60 style-5">
          <h2 className="mb-20"> Opening <span> Positions </span> </h2>
          <div className="text color-666">More than 15,000 companies trust and choose Itech</div>
        </div>
        <div className="row">
          {
            positions.map((position, index) => (
              <div className="col-lg-4" key={index}>
                <a href="#" className={`position-card ${index !== positions.length - 1 ? ' mb-4 mb-lg-0':''}`}>
                  <h5>{ position.title }</h5>
                  <p>{ position.description }</p>
                  <div className="time">
                    <span className="me-4"> <i className="fal fa-clock me-1 color-main"></i> Full-time </span>
                    <span> <i className="fal fa-dollar-sign me-1 color-main"></i> { position.salary } </span>
                  </div>
                  {position.trend && <span className="trend-mark"> <i className="fas fa-bolt"></i> </span>}
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Positions