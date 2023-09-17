import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { PostModel } from '../../models/post';
import { fetchDetailBlog } from '../../redux/action/post';
import { RootState } from '../../redux/store';
import ToastMessage from '../../shared/components/ToastMessage';
import DetailLoading from './DetailLoading';
import DetailBlog from './components/DetailBlog';
import DetailCover from './components/DetailCover';

const Detail = () => {
  const dispatch = useDispatch();

  const post: PostModel = useSelector((state: RootState) => state.detail.data);
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  const isError = useSelector((state: RootState) => state.detail.isError);
  const message = useSelector((state: RootState) => state.detail.message);

  const { postId } = useParams();

  useEffect(() => {
    dispatch(fetchDetailBlog(Number(postId)) as any);
  }, [dispatch, postId]);

  return _handleContentDetailPage(post, isLoading, isError, message);
};

export default Detail;

const _handleContentDetailPage = (post: PostModel, isLoading: boolean, isError: boolean, message: string) => {
  if (isLoading) {
    return <DetailLoading />;
  } else if (isError && !post.id) {
    return <Navigate to="/page-not-found" />;
  } else {
    return (
      <>
        <div className="detail-page">
          <article>
            <DetailCover
              cover={post.cover}
              title={post.title}
              authorName={post.user?.firstName + ' ' + post.user?.lastName}
              authorAvatar={post.user?.picture}
              datePost={post.createdAt}
            />
            <section className="section section-detail-content">
              <div className="detail-content d-flex">
                <DetailBlog post={post} />
              </div>
            </section>
          </article>
        </div>
        {isError && <ToastMessage isShow={isError} isSuccess={false} title={'Error'} subtitle={message} />}
      </>
    );
  }
};
