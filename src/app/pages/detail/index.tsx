import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PostModel } from '../../models/post-item';
import { fetchDetailBlog } from '../../redux/action/post';
import { RootState } from '../../redux/store';
import DetailLoading from './DetailLoading';
import DetailBlog from './components/DetailBlog';
import DetailCover from './components/DetailCover';

const Detail = () => {
  const dispatch = useDispatch();

  const { postId } = useParams();

  const post: PostModel = useSelector((state: RootState) => state.detail.data);
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  const isError = useSelector((state: RootState) => state.detail.isError);

  useEffect(() => {
    fetchDetailBlog(Number(postId), dispatch);
  }, [dispatch, postId]);

  return (
    <>
      {true ? (
        <DetailLoading />
      ) : (
        <div className="detail-page">
          <DetailCover
            cover={post.cover}
            title={post.title}
            authName={post.user?.firstName + ' ' + post.user?.lastName}
            authAvatar={post.user?.picture}
          />
          <section className="section section-detail-content">
            <div className="container">
              <div className="detail-content d-flex">
                <DetailBlog post={post} />
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Detail;
