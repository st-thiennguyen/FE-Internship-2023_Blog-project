import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { fetchPublicPosts } from '../home.actions';
import { Link } from 'react-router-dom';

import PostItemLoading from './PostItemLoading';
import { pageSize } from '../../../shared/constants/post';
import PostList from './PostList';
import SectionTitle from '../../../shared/components/SectionTitle';
import CirculatorLoading from '../../../shared/components/CirculatorLoading';

const LatestPost = () => {
  const isLoading = useSelector((state: RootState) => state.latestPost.isLoading);
  const { data } = useSelector((state: RootState) => state.latestPost);
  const dispatch = useDispatch<any>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    dispatch(fetchPublicPosts({ page: 1, size: pageSize }));
  }, []);

  useEffect(() => {
    dispatch(fetchPublicPosts({ page: currentPage, size: pageSize }));
  }, [currentPage]);

  return (
    <section className="section section-latest-post">
      <div className="section-header d-flex justify-between item-center">
        <SectionTitle
          title="Lastest Post 🎈"
          subtitle="Discover the most outstanding articles ins all topics of life."
        />

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
      {isLoading && data.length && <CirculatorLoading />}
      <div className="d-flex justify-center">
        <button className="btn btn-primary" onClick={() => setCurrentPage(currentPage + 1)}>
          Load more
        </button>
      </div>
    </section>
  );
};

export default LatestPost;
