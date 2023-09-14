import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPublicPosts } from '../../../redux/action/post';
import { RootState } from '../../../redux/store';
import { pageSize } from '../../../shared/constants/post';
import PostList from './PostList';

const LatestPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const posts = useSelector((state: RootState) => state.post.data);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchPublicPosts(currentPage, pageSize));
  }, [currentPage]);

  return (
    <section className="section section-latest-post">
      <h2 className="section-title">Latest Post</h2>
      <PostList posts={posts} />
      <div className="btn-load-more-wrapper d-flex justify-center">
        <button className="btn btn-primary" onClick={() => setCurrentPage(currentPage + 1)}>
          Load More
        </button>
      </div>
    </section>
  );
};

export default LatestPost;
