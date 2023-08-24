import timelineItems from '@data/Style2/timeline.json';

const Timeline = () => {
  return (
    <section className="timeline section-padding bg-gray5">
      <div className="container">
        <div className="section-head text-center mb-70 style-5">
          <h2 className="mb-20"> Journey Was <span> Started </span> </h2>
          <p>More than 15,000 companies trust and choose Itech</p>
        </div>
        <div className="timeline-content">
          {
            timelineItems.map((item, index) => (
              <div className="timeline-card" key={index}>
                <div className="row justify-content-around align-items-center">
                  {
                    index % 2 === 0 && (
                      <div className="col-lg-4">
                        <div className="card-year text-lg-end wow left_to_right_apperance ">
                          <h3> { item.year } </h3>
                        </div>
                      </div>
                    )
                  }
                  <div className="col-lg-4">
                    <div className="card-info wow left_to_right_apperance ">
                      <h6> { item.title } </h6>
                      <p> { item.text } </p>
                      <span className="num"> { item.num } </span>
                    </div>
                  </div>{
                    index % 2 !== 0 && (
                      <div className="col-lg-4">
                        <div className="card-year wow left_to_right_apperance ">
                          <h3> { item.year } </h3>
                        </div>
                      </div>
                    )
                  }
                </div>
                <div className="line wow"></div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Timeline