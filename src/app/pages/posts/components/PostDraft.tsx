import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostItemLoading from '../../home/components/PostItemLoading';
import PostList from '../../home/components/PostList';
import { RootState } from '../../../stores/store';
import { getDraftPostAction, loadMore } from '../posts.action';

const PostDraft = () => {
  const isLoading = useSelector((state: RootState) => state.postTag.isLoading);
  const posts = useSelector((state: RootState) => state.postTag.data);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getDraftPostAction());
  }, []);

  return (
    <section className="section section-post-recycle">
      <div className="container">
        <h2 className="section-title text-primary">Posts Draft</h2>

        {posts && <PostList posts={posts} isLoading={isLoading} />}
        {isLoading && (
          <ul className="row">
            {Array.from({ length: 6 }, (item, index) => (
              <li className="post-item col col-4 col-md-12" key={index}>
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
