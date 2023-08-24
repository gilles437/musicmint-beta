import blogs from '@data/Style2/blogs.json';

const Blog = () => {
  return (
    <section className="blog style-8">
      <div className="container">
        <div className="content section-padding">
          <div className="section-head text-center mb-70 style-5">
            <h2 className="mb-20"> News & <span> Insights </span> </h2>
            <p>More than 15,000 companies trust and choose Itech</p>
          </div>
          <div className="blog-content">
            <div className="row">
              <div className="col-lg-6">
                <div className="main-post wow fadeInUp">
                  <div className="img img-cover">
                    <img src="/assets/img/blog/18.jpg" alt="" />
                    <div className="tags">
                      <a href="#"> Analysis </a>
                    </div>
                  </div>
                  <div className="info pt-30">
                    <div className="date-author">
                      <a href="#" className="date">
                        Nov 21, 2022
                      </a>
                      <span className="color-999 mx-3"> | </span>
                      <a href="#" className="author color-999">
                        By <span className="color-000 fw-bold"> Admin </span>
                      </a>
                    </div>
                    <h4 className="title">
                      <a href="#"> Create Live Segments & Target The Right People For Your Amazing Team. </a>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="side-posts">
                  {
                    blogs.map((blog, index) => (
                      <div key={index} className="item wow fadeInUp" data-wow-delay={`${index * 0.2}s`}>
                        <div className="img img-cover">
                          <img src={blog.image} alt="" />
                        </div>
                        <div className="info">
                          <div className="date-author">
                            <a href="#" className="date">
                              { blog.date }
                            </a>
                            <span className="color-999 mx-3"> | </span>
                            <a href="#" className="author color-999">
                              By <span className="color-000 fw-bold"> { blog.admin } </span>
                            </a>
                          </div>
                          <h4 className="title">
                            <a href="#"> { blog.title } </a>
                          </h4>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog