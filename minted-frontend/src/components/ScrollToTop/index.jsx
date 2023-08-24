import { useEffect } from 'react';
import scrollToTop from '@common/scrollToTop';

const ScrollToTop = ({ topText }) => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <a href="#" className={`to_top ${topText ? '':'bg-gray rounded-circle icon-40 d-inline-flex align-items-center justify-content-center'}`}>
      <i className={`bi bi-chevron-up ${topText ? '':'fs-6 text-dark'}`}></i>
      { topText && <small>Top</small> }
    </a>
  );
};

export default ScrollToTop;
