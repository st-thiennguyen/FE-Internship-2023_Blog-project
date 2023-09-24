import { useEffect, useState } from 'react';

const goToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

const GoToTopBtn = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    goToTop();
    const onScroll = () => setOffset(window.pageYOffset);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return offset > 1000 ? (
    <button className="btn-backtotop  d-flex justify-center item-center" onClick={goToTop}>
      <i className="icon icon-medium icon-arrow-up-24"></i>
    </button>
  ) : (
    <></>
  );
};

export default GoToTopBtn;
