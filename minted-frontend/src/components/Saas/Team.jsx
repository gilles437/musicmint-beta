import teamMembers from '@data/Saas/team.json';
import teamMembersRTL from '@data/Saas/team-rtl.json';

const Team = ({ rtl }) => {
  const teamData = rtl ? teamMembersRTL : teamMembers;

  return (
    <section className="team section-padding style-6">
      <div className="content">
        <div className="container">
          <div className="section-head text-center mb-70 style-5">
            <h2 className="mb-20">{ rtl ? 'افضل' : 'Our' } <span>{ rtl ? 'المديرين' : 'Leaders' }</span> </h2>
            <p>{ rtl ? 'المهنية والودية شعارنا. تعرف على قادتنا' : 'Profressional & Friendly is our slogan. Meet our leaders' }</p>
          </div>
          <div className="row">
            {
              teamData.map((member, index) => (
                <div className="col-lg-3 col-sm-6" key={index}>
                  <div className={`team-card ${index !== teamMembers.length - 1 ? 'mb-30 mb-lg-0':''} style-6`}>
                    <div className="img img-cover">
                      <img src={member.picture} alt="" />
                      <div className="social-icons">
                        <a href="#" className="me-1">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="me-1">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="me-1">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-github"></i>
                        </a>
                      </div>
                    </div>
                    <div className="info">
                      <a className="d-block" href="#"><h6>{ member.name }</h6></a>
                      <small>{ member.position }</small>
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

export default Team