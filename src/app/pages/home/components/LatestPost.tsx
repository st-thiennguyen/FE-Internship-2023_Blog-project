import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPublicPosts } from '../../../redux/action/post';
import { RootState } from '../../../redux/store';
import { pageSize } from '../../../shared/constants/post';
import PostList from './PostList';

const LatestPost = () => {
  const currentPage = useSelector((state: RootState) => state.post.currentPage);
  const posts = useSelector((state: RootState) => state.post.data);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchPublicPosts(currentPage, pageSize));
  }, []);

  return (
    <section className="section section-latest-post">
      <h2 className="section-title">Latest Post</h2>
      <PostList posts={posts} />
    </section>
  );
};

export default LatestPost;
