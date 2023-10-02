import Slider from 'react-slick';

import RecommendItem from './RecommendItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../stores/store';
import { getRecommend } from '../../home.actions';
import { useEffect } from 'react';
import SectionTitle from '../../../../shared/components/SectionTitle';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommend(1, 10) as any);
  }, []);

  return (
    <section className="section section-recommend">
      <Slider {...settings} className="recommend-list">
        {recommendPosts.map((post) => {
          return <RecommendItem post={post} key={post.id} />;
        })}
      </Slider>
    </section>
  );
};

export default Recommend;
