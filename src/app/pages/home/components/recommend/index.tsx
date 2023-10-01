import { useSelector } from 'react-redux';

import { RootState } from '../../../../stores/store';
import PostItem from '../../../../shared/components/PostItem';
import SectionTitle from '../../../../shared/components/SectionTitle';
const Recommend = () => {
  const recommendPosts = useSelector((state: RootState) => state.recommend.data);

  return (
    <section className="section section-recommend">
      <SectionTitle title="Recommend for you" />
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
