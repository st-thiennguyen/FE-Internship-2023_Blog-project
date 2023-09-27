import { useEffect } from 'react';

import { pageSize } from '../../../shared/constants/post';
import PostItemLoading from '../../home/components/PostItemLoading';
import PostList from '../../home/components/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import { fetchPostWithTags, loadMore, resetCurrentPage } from '../posts.action';
import { useLocation } from 'react-router-dom';

const threshold = 400;

const PostResult = () => {
  const isLoading = useSelector((state: RootState) => state.postTag.isLoading);
  const currentPage = useSelector((state: RootState) => state.postTag.currentPage);
  const totalPage = useSelector((state: RootState) => state.postTag.totalPage);
  const posts = useSelector((state: RootState) => state.postTag.data);

  const dispatch = useDispatch<any>();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    dispatch(resetCurrentPage());
  }, []);

  const getQuery = (): string[] => {
    const tagsQuery = searchParams.get('tags');
    const tagArray = tagsQuery?.split(',');
    return tagArray || [];
  };

  useEffect(() => {
    dispatch(fetchPostWithTags({ page: currentPage, size: pageSize, tags: getQuery() }));
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
      <div className="container">
        <h2 className="section-title text-primary">RESULT OF FOUND</h2>

        {posts && <PostList posts={posts} isLoading={isLoading} />}
        {isLoading && (
          <ul className="row">
            {Array.from({ length: 6 }, (item, index) => (
              <li className="post-item col col-4 col-lg-6 col-sm-12" key={index}>
                <PostItemLoading />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default PostResult;
