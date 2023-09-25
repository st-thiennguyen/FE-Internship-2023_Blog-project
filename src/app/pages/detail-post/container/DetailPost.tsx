import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { PostModel } from '../../../models/post';
import { RootState } from '../../../stores/store';
import { fetchComments, fetchDetailBlog } from '../detail-post.actions';

import DetailPostContent from '../components/DetailPostContent';
import DetailPostCover from '../components/DetailPostCover';
import DetailPostLoading from '../components/DetailPostLoading';
import DetailPostComment from '../components/DetailPostComment';
import ToastMessage from '../../../shared/components/ToastMessage';
import Aside from '../../../shared/layout/aside/container/Aside';

const DetailPost = () => {
  const dispatch = useDispatch();

  const post: PostModel = useSelector((state: RootState) => state.detail.data);
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  const isError = useSelector((state: RootState) => state.detail.isError);
  const message = useSelector((state: RootState) => state.detail.message);

  const { postId } = useParams();
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (postId) {
      dispatch(fetchDetailBlog(Number(postId)) as any);
      dispatch(fetchComments(postId) as any);
    }
  }, [postId]);

  if (isLoading) {
    return <DetailPostLoading />;
  }

  if (isError && !post.id) {
    return <Navigate to="/page-not-found" />;
  }

  const scrollToComment = () => {
    commentRef.current!.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="detail-page">
        <div className="row">
          <div className="col col-9">
            <article>
              <DetailPostCover
                cover={post.cover}
                title={post.title}
                authorName={post.user?.displayName}
                authorAvatar={post.user?.picture}
                datePost={post.createdAt}
                authorId={post.userId}
              />
              <section className="section section-detail-content">
                <div className="detail-content d-flex">
                  <DetailPostContent post={post} scrollToComment={scrollToComment} />
                </div>
              </section>
            </article>
            <DetailPostComment ref={commentRef} />
          </div>
          <div className="col col-3">
            <Aside />
          </div>
        </div>
      </div>
      {isError && <ToastMessage isShow={isError} isSuccess={false} title={'Error'} subtitle={message} />}
    </>
  );
};

export default DetailPost;
