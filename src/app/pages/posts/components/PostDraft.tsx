import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { pageSize } from '../../../shared/constants/post';
import PostItemLoading from '../../home/components/PostItemLoading';
import PostList from '../../home/components/PostList';
import { RootState } from '../../../stores/store';
import { loadMore } from '../posts.action';
import { fetchPublicPosts } from '../../home/home.actions';

const PostDraft = () => {
  const threshold = 400;

  const isLoading = useSelector((state: RootState) => state.postTag.isLoading);
  // const currentPage = useSelector((state: RootState) => state.postTag.currentPage);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = useSelector((state: RootState) => state.postTag.totalPage);
  const posts = useSelector((state: RootState) => state.postTag.data);

  const dispatch = useDispatch<any>();

  //   useEffect(() => {
  //     dispatch(resetCurrentPage());
  //   }, []);

  useEffect(() => {
    dispatch(fetchPublicPosts({ page: currentPage }));
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
      </div>
    </section>
  );
};

export default PostDraft;
