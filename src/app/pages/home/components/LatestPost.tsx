import { useEffect, useState } from 'react';

import { pageSize } from '../../../shared/constants/post';
import PostItemLoading from './PostItemLoading';
import PostList from './PostList';
import EmptyPost from './recommend/EmptyPost';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import { fetchPublicPosts } from '../home.actions';

const threshold = 400;

const LatestPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = useSelector((state: RootState) => state.post.isLoading);
  const totalPage = useSelector((state: RootState) => state.post.totalPage);
  const posts = useSelector((state: RootState) => state.post.data);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchPublicPosts(currentPage, pageSize));
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - threshold && !isLoading && currentPage + 1 <= totalPage) {
      setCurrentPage(currentPage + 1);
      dispatch(fetchPublicPosts(currentPage, pageSize));
    }
  };

  useEffect(() => {
    if (posts.length) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <section className="section section-latest-post">
      <h2 className="section-title">Latest Post</h2>
      {posts.length ? <PostList posts={posts} /> : <EmptyPost />}
      {currentPage > 1 && isLoading && (
        <div className="row">
          {Array.from({ length: 6 }, (item, index) => (
            <li className="post-item col col-6 col-md-12" key={index}>
              <PostItemLoading />
            </li>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestPost;
