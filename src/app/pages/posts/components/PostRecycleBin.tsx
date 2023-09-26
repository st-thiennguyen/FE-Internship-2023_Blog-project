import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pageSize } from '../../../shared/constants/post';
import PostItemLoading from '../../home/components/PostItemLoading';
import PostList from '../../home/components/PostList';
import { RootState } from '../../../stores/store';
import { fetchSoftDeletedPosts, loadMore, resetCurrentPage } from '../posts.action';

const threshold = 400;

const PostRecycleBin = () => {
  const isLoading = useSelector((state: RootState) => state.postTag.isLoading);
  const currentPage = useSelector((state: RootState) => state.postTag.currentPage);
  const totalPage = useSelector((state: RootState) => state.postTag.totalPage);
  const posts = useSelector((state: RootState) => state.postTag.data);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(resetCurrentPage());
  }, []);

  useEffect(() => {
    dispatch(fetchSoftDeletedPosts(currentPage, pageSize));
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
    <section className="section section-post-recycle">
      <h2 className="section-title text-primary">Posts Deleted</h2>

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

export default PostRecycleBin;
