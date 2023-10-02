import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { pageSize } from '../../../shared/constants/post';
import { fetchPostWithTags, loadMore } from '../posts.action';

import SectionTitle from '../../../shared/components/SectionTitle';
import PostList from '../../home/components/PostList';
import PostItemLoading from '../../home/components/PostItemLoading';
import CirculatorLoading from '../../../shared/components/CirculatorLoading';

const threshold = 100;

const PostResult = () => {
  const isLoading = useSelector((state: RootState) => state.post.isLoading);
  const currentPage = useSelector((state: RootState) => state.post.currentPage);
  const totalPage = useSelector((state: RootState) => state.post.totalPage);
  const posts = useSelector((state: RootState) => state.post.data);

  const dispatch = useDispatch<any>();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const tagsQuery = searchParams.get('tags');
  useEffect(() => {
    if (currentPage === 1) {
      dispatch(fetchPostWithTags({ page: 1, size: pageSize, tags: getQuery() }));
    }
  }, []);

  const getQuery = (): string[] => {
    const tagArray = tagsQuery?.split(',');
    return tagArray || [];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (tagsQuery) {
      dispatch(fetchPostWithTags({ page: 1, size: pageSize, tags: getQuery() }));
    }
  }, [tagsQuery]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - threshold && !isLoading && currentPage + 1 <= totalPage) {
      dispatch(loadMore());
      dispatch(fetchPostWithTags({ page: currentPage, size: pageSize, tags: getQuery() }));
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
    <section className="section section-post-result">
      <div className="container">
        <SectionTitle title={`${tagsQuery ? `Result of found #${tagsQuery}` : 'Lastest posts'}`} />

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

        {isLoading && posts.length && <CirculatorLoading />}
      </div>
    </section>
  );
};

export default PostResult;
