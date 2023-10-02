import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { getDraftPostAction } from '../posts.action';

import SectionTitle from '../../../shared/components/SectionTitle';
import PostItem from '../../../shared/components/PostItem';
import EmptyPost from '../../../shared/components/EmptyPost';
import PostItemLoading from '../../home/components/PostItemLoading';

const PostDraft = () => {
  const posts = useSelector((state: RootState) => state.post.data);
  const isLoading = useSelector((state: RootState) => state.post.isLoading);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getDraftPostAction());
  }, []);

  return (
    <section className="section section-draft">
      <div className="container">
        <SectionTitle title="Draft" subtitle="A list of all your draft posts." />
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
        {isLoading && (
          <ul className="row">
            {Array.from({ length: 6 }, (item, index) => (
              <li className="post-item col col-3 col-lg-4 col-md-6 col-sm-12" key={index}>
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
