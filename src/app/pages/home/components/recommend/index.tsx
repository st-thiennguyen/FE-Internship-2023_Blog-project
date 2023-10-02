import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';

import { RootState } from '../../../../stores/store';
import { getRecommend } from '../../home.actions';
import RecommendLoading from './RecommendLoading';
import RecommendItem from './RecommendItem';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Recommend = () => {
  const recommendPosts = useSelector((state: RootState) => state.recommend.data);
  const { isLoading } = useSelector((state: RootState) => state.recommend);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommend(1, 10) as any);
  }, []);

  return (
    <section className="section section-recommend">
      {recommendPosts.length > 0 && !isLoading && (
        <Slider {...settings} className="recommend-list">
          {recommendPosts.map((post) => {
            return <RecommendItem post={post} key={post.id} />;
          })}
        </Slider>
      )}
      {isLoading && <RecommendLoading />}
    </section>
  );
};

export default Recommend;
