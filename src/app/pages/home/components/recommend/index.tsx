import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../../stores/store';
import PostItem from '../../../../shared/components/PostItem';
import SectionTitle from '../../../../shared/components/SectionTitle';
import RecommendItemLoading from './RecommendLoading';
import { useEffect } from 'react';
import { getRecommend } from '../../home.actions';
const Recommend = () => {
  const recommendPosts = useSelector((state: RootState) => state.recommend.data);
  const isLoading = useSelector((state: RootState) => state.recommend.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommend(1, 10) as any);
  }, []);

  return (
    <section className="section section-recommend">
      <SectionTitle title="Recommend for you" />
      <ul className="recommend-list">
        {isLoading
          ? Array.from({ length: 5 }, () => {
              return (
                <div className="recommend-item">
                  <RecommendItemLoading isVertical={true} />
                </div>
              );
            })
          : recommendPosts.slice(0, 5).map((post) => {
              return (
                <li className="recommend-item" key={post.id}>
                  <PostItem post={post} isVertical={true} />
                </li>
              );
            })}
      </ul>
    </section>
  );
};

export default Recommend;
