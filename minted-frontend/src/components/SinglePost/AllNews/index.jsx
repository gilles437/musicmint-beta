import Details from './Details';
import Metadata from './Metadata';
import Content from './Content';
import Comments from './Comments';
import Sidebar from './Sidebar';

import news from '@data/SinglePost/all-news.json';
import newsRTL from '@data/SinglePost/all-news-rtl.json';

const AllNews = ({ isWide = true, leftSidebar = false, style = "5", rtl = false }) => {
  const data = rtl ? newsRTL : news;

  return (
    <section className="all-news section-padding pt-50 blog bg-transparent style-3">
      <div className="container">
        <Details details={{ title: data.title, time: data.time, type: data.type }} style={style} rtl={rtl} />
        <div className="row gx-4 gx-lg-5">
          {
            !isWide && leftSidebar && (<Sidebar data={data.sidebar} style={style} rtl={rtl} />)
          }
          <div className={isWide ? 'col-lg-12':'col-lg-8'}>
            <Metadata metadata={{ imgLetter: data.imgLetter, user: data.user, commentsCount: data.commentsCount, viewsCount: data.viewsCount }} rtl={rtl} />
            <div className="blog-content-info">
              <Content style={style} rtl={rtl} />
              <Comments comments={data.comments} commentCard={data.commentCard} style={style} rtl={rtl} />
            </div>
          </div>
          {
            !isWide && !leftSidebar && (<Sidebar data={data.sidebar} style={style} rtl={rtl} />)
          }
        </div>
      </div>
    </section>
  )
}

export default AllNews