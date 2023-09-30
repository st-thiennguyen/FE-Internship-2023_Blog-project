import { useSelector } from 'react-redux';

import { RootState } from '../../../../stores/store';
import PostItem from '../../../../shared/components/PostItem';
const Recommend = () => {
  const recommendPosts = useSelector((state: RootState) => state.recommend.data);

  return (
    <section className="section section-recommend">
      <h2 className="section-title">Recommend</h2>
      <ul className="recommend-list">
        {recommendPosts.slice(0, 5).map((post) => {
          return (
            <li className="recommend-item">
              <PostItem post={post} isVertical={true} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Recommend;
