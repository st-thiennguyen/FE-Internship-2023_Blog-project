import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { RootState } from '../../../../stores/store';
import RecommendItem from './RecommendItem';
const Recommend = () => {
  const recommendPosts = useSelector((state: RootState) => state.recommend.data);

  return (
    <section className="section section-recommend">
      <div className="recommend-wrapper">
        <div className="recommend-banner">
          <img src={recommendPosts[0].cover} alt={recommendPosts[0].title} className="recommend-banner-img" />
          <div className="recommend-banner-content">
            <h2 className="recommend-banner-title">{recommendPosts[0].title}</h2>
            <p className="recommend-banner-desc">{recommendPosts[0].description}</p>
            <Link to={`/posts/${recommendPosts[0].id}`} className="post-link">
              <button className="btn btn-read-more d-flex item-center">
                <Link to={`/posts/${recommendPosts[0].id}`} className="post-link">
                  Read more
                </Link>
                <i className="icon icon-small icon-arrow-right-20"></i>
              </button>
            </Link>
          </div>
        </div>
        <ul className="recommend-post-list row">
          {recommendPosts.slice(1, 4).map((post) => {
            return <RecommendItem post={post} key={post.id} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default Recommend;
