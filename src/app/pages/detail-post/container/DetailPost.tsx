import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { PostModel } from '../../../models/post';
import ToastMessage from '../../../shared/components/ToastMessage';
import { RootState } from '../../../stores/store';
import DetailPostContent from '../components/DetailPostContent';
import DetailPostCover from '../components/DetailPostCover';
import DetailPostLoading from '../components/DetailPostLoading';
import { fetchDetailBlog } from '../detail-post.actions';

const DetailPost = () => {
  const dispatch = useDispatch();

  const post: PostModel = useSelector((state: RootState) => state.detail.data);
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  const isError = useSelector((state: RootState) => state.detail.isError);
  const message = useSelector((state: RootState) => state.detail.message);

  const { postId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(fetchDetailBlog(Number(postId)) as any);
  }, [postId]);

  if (isLoading) {
    return <DetailPostLoading />;
  }

  if (isError && !post.id) {
    return <Navigate to="/page-not-found" />;
  }

  return (
    <>
      <div className="detail-page">
        <article>
          <DetailPostCover
            cover={post.cover}
            title={post.title}
            authorName={post.user?.firstName + ' ' + post.user?.lastName}
            authorAvatar={post.user?.picture}
            datePost={post.createdAt}
          />
          <section className="section section-detail-content">
            <div className="detail-content d-flex">
              <DetailPostContent post={post} />
            </div>
          </section>
        </article>
      </div>
      {isError && <ToastMessage isShow={isError} isSuccess={false} title={'Error'} subtitle={message} />}
    </>
  );
};

export default DetailPost;