import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pageSize } from '../../../shared/constants/post';
import PostItemLoading from '../../home/components/PostItemLoading';
import { RootState } from '../../../stores/store';
import { getRecyclebinAction, loadMore, resetCurrentPage } from '../posts.action';
import PostItem from '../../../shared/components/PostItem';
import Loading from '../../../shared/components/Loading';
import EmptyPost from '../../../shared/components/EmptyPost';
import CirculatorLoading from '../../../shared/components/CirculatorLoading';

const threshold = 400;

const PostRecycleBin = () => {
  const isLoading = useSelector((state: RootState) => state.post.isLoading);
  const currentPage = useSelector((state: RootState) => state.post.currentPage);
  const totalPage = useSelector((state: RootState) => state.post.totalPage);
  const posts = useSelector((state: RootState) => state.post.data);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(resetCurrentPage());
  }, []);

  useEffect(() => {
    dispatch(getRecyclebinAction(currentPage, pageSize));
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
      <div className="container">
        <h2 className="section-title text-primary">Posts Deleted</h2>

        {posts &&
          (posts.length > 0 || isLoading ? (
            <ul className="post-list row">
              {posts.map((post, index) => {
                return (
                  <li className="post-item col col-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                    <PostItem post={post} isVertical={true} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyPost />
          ))}
        {isLoading && posts.length === 0 && (
          <ul className="row">
            {Array.from({ length: 6 }, (item, index) => (
              <li className="post-item col col-3 col-lg-4 col-md-6 col-sm-12" key={index}>
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

export default PostRecycleBin;
