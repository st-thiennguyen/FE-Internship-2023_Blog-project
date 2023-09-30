import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { fetchPublicPosts, loadMore } from '../home.actions';

import PostItemLoading from './PostItemLoading';
import { pageSize } from '../../../shared/constants/post';
import PostList from './PostList';
import CirculatorLoading from '../../../shared/components/CirculatorLoading';

const threshold = 100;

const LatestPost = () => {
  const isLoading = useSelector((state: RootState) => state.latestPost.isLoading);
  const { currentPage, totalPage, data } = useSelector((state: RootState) => state.latestPost);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (currentPage === 1) {
      dispatch(fetchPublicPosts({ page: 1, size: pageSize }));
    }
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - threshold && !isLoading && currentPage <= totalPage) {
      dispatch(loadMore());
      dispatch(fetchPublicPosts({ page: currentPage, size: pageSize }));
    }
  };

  useEffect(() => {
    if (data.length) {
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

      {isLoading && data.length && <CirculatorLoading />}
    </section>
  );
};

export default LatestPost;
