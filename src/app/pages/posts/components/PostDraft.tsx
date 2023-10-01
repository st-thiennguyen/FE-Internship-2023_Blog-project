import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { getDraftPostAction } from '../posts.action';
import PostItem from '../../../shared/components/PostItem';
import EmptyPost from '../../../shared/components/EmptyPost';

const PostDraft = () => {
  const posts = useSelector((state: RootState) => state.post.data);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getDraftPostAction());
  }, []);

  return (
    <section className="section section-draft">
      <div className="container">
        <h2 className="section-title text-primary">Draft Posts</h2>
        <ul className="row">
          {posts.length ? (
            posts.map((post, index) => (
              <li className="post-item col col-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                <PostItem post={post} isVertical={true} />
              </li>
            ))
          ) : (
            <EmptyPost desc="Your draft list is empty" />
          )}
        </ul>
      </div>
    </section>
  );
};

export default PostDraft;
