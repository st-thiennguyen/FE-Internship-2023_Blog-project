import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { fetchPublicPosts, loadMore, resetCurrentPage } from '../home.actions';
import { Link } from 'react-router-dom';

import PostItemLoading from './PostItemLoading';
import { pageSize } from '../../../shared/constants/post';
import PostList from './PostList';

const LatestPost = () => {
  const isLoading = useSelector((state: RootState) => state.latestPost.isLoading);
  const { currentPage, data } = useSelector((state: RootState) => state.latestPost);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    resetCurrentPage();
    dispatch(fetchPublicPosts({ page: 1, size: pageSize }));
  }, []);

  return (
    <section className="section section-latest-post">
      <div className="section-header d-flex justify-between item-center">
        <div className="section-title-wrapper">
          <h2 className="section-title">Latest Post 🎈</h2>
          <p className="section-sub-title">Discover the most outstanding articles ins all topics of life.</p>
        </div>

        <Link to={'/posts'}>
          <button className="btn btn-primary">Show More </button>
        </Link>
      </div>
      {data && <PostList posts={data} isLoading={isLoading} />}

      {isLoading && data.length === 0 && (
        <ul className="row">
          {Array.from({ length: 6 }, (item, index) => (
            <li className="post-item col col-6 col-lg-12" key={index}>
              <PostItemLoading />
            </li>
          ))}
        </ul>
      )}
      <div className="d-flex justify-center">
        <Link to={'/posts'}>
          <button className="btn btn-primary">Show More </button>
        </Link>
      </div>
    </section>
  );
};

export default LatestPost;
