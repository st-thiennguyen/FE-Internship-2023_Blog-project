import { useEffect, useState } from 'react';

import IconTopArrow from './icon/IconTopArrow';

const goToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

const GoToTopBtn = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    goToTop();

    const onScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;

      const maxScroll = scrollHeight - windowHeight;
      const percentage = (scrollTop / maxScroll) * 100;
      setOffset(Math.floor(percentage));
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return offset > 20 ? (
    <button className="btn-backtotop  d-flex justify-center item-center" onClick={goToTop}>
      {offset < 80 ? (
        <p className="offset-per">{offset}%</p>
      ) : (
        <div className="icon icon-xs">
          <IconTopArrow />
        </div>
      )}
      <div className="tool-tip-backtotop">Back to top</div>
    </button>
  ) : (
    <></>
  );
};

export default GoToTopBtn;
