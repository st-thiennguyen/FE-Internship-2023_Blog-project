import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPublicPosts, loadMore, resetCurrentPage } from '../../../redux/action/post';
import { RootState } from '../../../redux/store';
import { pageSize } from '../../../shared/constants/post';
import PostItemLoading from './PostItemLoading';
import PostList from './PostList';

const LatestPost = () => {
  const currentPage = useSelector((state: RootState) => state.post.currentPage);
  const isLoading = useSelector((state: RootState) => state.post.isLoading);
  const posts = useSelector((state: RootState) => state.post.data);
  const totalPage = useSelector((state: RootState) => state.post.totalPage);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(resetCurrentPage());
  }, []);

  useEffect(() => {
    dispatch(fetchPublicPosts(currentPage, pageSize));
  }, [currentPage]);

  const isLoadmore = () => {
    return currentPage + 1 <= totalPage;
  };

  return (
    <section className="section section-latest-post">
      <h2 className="section-title">Latest Post</h2>
      <PostList posts={posts} />
      {currentPage > 1 && isLoading && (
        <div className="row">
          {Array.from({ length: 6 }, (item, idx) => (
            <li className="post-item col col-6 col-md-12" key={idx}>
              <PostItemLoading />
            </li>
          ))}
        </div>
      )}
      {isLoadmore() && (
        <div className="btn-load-more-wrapper d-flex justify-center">
          <button className="btn btn-primary" onClick={() => dispatch(loadMore())}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default LatestPost;
