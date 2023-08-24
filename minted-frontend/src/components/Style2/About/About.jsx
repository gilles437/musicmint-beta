import tabs from '@data/Style2/about.json';

const About = () => {
  return (
    <section className="about style-2 section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="img img-cover">
              <img src="/assets/img/about/about2.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="info px-lg-5">
              <div className="section-head style-5 mb-40">
                <h2 className="mb-20"> Work For Your <span> Incredible Success </span> </h2>
              </div>
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                {
                  tabs.tablist.map((item, index) => (
                    <li className="nav-item" role="presentation" key={item.id}>
                      <button className={`nav-link ${index === 0 ? 'active' : ''}`} id={item.id} data-bs-toggle="pill" data-bs-target={'#' + item.tab_id} type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                        { item.text }
                      </button>
                    </li>
                  ))
                }
              </ul>
              <div className="tab-content" id="pills-tabContent">
                {
                  tabs.tabpanels.map((panel, index) => (
                      <div className={`tab-pane fade ${index === 0 ? 'show active' : ''}`} key={panel.id} id={panel.id} role="tabpanel">
                        <p className="text"> { panel.text } </p>
                        <div className="d-flex align-items-center mt-40">
                          <div className="btns">
                            <a href="#" className="btn rounded-pill blue5-3Dbutn hover-blue2 sm-butn fw-bold">
                              <span> Learn More </span>
                            </a>
                          </div>
                          <div className="inf ms-3">
                            <p className="color-999"> Support Email </p>
                            <a href="#" className="fw-bold color-000"> info@webmail.com </a>
                          </div>
                        </div>
                      </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="/assets/img/about/about2_pattern_l.png" alt="" className="pattern_l" />
      <img src="/assets/img/about/about2_pattern_r.png" alt="" className="pattern_r" />
    </section>
  )
}

export default About