import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { fetchPublicPosts, loadMore, resetCurrentPage } from '../home.actions';

import PostItemLoading from './PostItemLoading';
import { pageSize } from '../../../shared/constants/post';
import PostList from './PostList';
import Loading from '../../../shared/components/Loading';

const threshold = 100;

const LatestPost = () => {
  const isLoading = useSelector((state: RootState) => state.latestPost.isLoading);
  const currentPage = useSelector((state: RootState) => state.latestPost.currentPage);
  const totalPage = useSelector((state: RootState) => state.latestPost.totalPage);
  const posts = useSelector((state: RootState) => state.latestPost.data);
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
      <div className="section-title-wrapper">
        <h2 className="section-title">Latest Post 🎈</h2>
        <p className="section-sub-title">Discover the most outstanding articles ins all topics of life.</p>
      </div>
      {posts && <PostList posts={posts} isLoading={isLoading} />}
      {isLoading && posts.length === 0 && (
        <ul className="row">
          {Array.from({ length: 6 }, (item, index) => (
            <li className="post-item col col-6 col-lg-12" key={index}>
              <PostItemLoading />
            </li>
          ))}
        </ul>
      )}

      {isLoading && posts.length && <Loading />}
    </section>
  );
};

export default LatestPost;
