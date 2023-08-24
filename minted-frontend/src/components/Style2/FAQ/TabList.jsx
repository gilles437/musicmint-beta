import faqTabs from '@data/Style2/faq-tabs.json';

const Tabs = () => {
  return (
    <section className="faq-tabs style-5">
      <div className="container">
        <ul className="nav nav-pills" id="pills-tab" role="tablist">
          {
            faqTabs.map((tab, index) => (
              <li className="nav-item" role="presentation" key={index}>
                <button className={`nav-card ${index === 0 ? 'active':''}`} id={tab.id} data-bs-toggle="pill" data-bs-target={tab.target} type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                  <div className="icon img-contain">
                    <img src={tab.image} alt="" />
                  </div>
                  <div className="info">
                    <h5> { tab.title } </h5>
                    <p> { tab.answers } Answer </p>
                  </div>
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default Tabs