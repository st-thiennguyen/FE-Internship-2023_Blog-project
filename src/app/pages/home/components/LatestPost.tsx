import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { fetchPublicPosts, loadMore, resetCurrentPage } from '../home.actions';

import PostItemLoading from './PostItemLoading';
import PostList from './PostList';
import { pageSize } from '../../../shared/constants/post';

const threshold = 400;

const LatestPost = () => {
  const isLoading = useSelector((state: RootState) => state.post.isLoading);
  const currentPage = useSelector((state: RootState) => state.post.currentPage);
  const totalPage = useSelector((state: RootState) => state.post.totalPage);
  const posts = useSelector((state: RootState) => state.post.data);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(resetCurrentPage());
  }, []);

  useEffect(() => {
    dispatch(fetchPublicPosts({ page: currentPage, size: pageSize }));
  }, [currentPage]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - threshold && !isLoading && currentPage + 1 <= totalPage) {
      dispatch(loadMore());
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
      {posts && <PostList posts={posts} isLoading={isLoading} />}
      {isLoading && (
        <ul className="row">
          {Array.from({ length: 6 }, (item, index) => (
            <li className="post-item col col-6 col-md-12" key={index}>
              <PostItemLoading />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default LatestPost;
