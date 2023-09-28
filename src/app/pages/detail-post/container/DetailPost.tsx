import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { PostModel } from '../../../models/post';
import { RootState } from '../../../stores/store';
import { fetchBookmark, fetchComments, fetchDetailBlog } from '../detail-post.actions';

import DetailPostContent from '../components/DetailPostContent';
import DetailPostCover from '../components/DetailPostCover';
import DetailPostLoading from '../components/DetailPostLoading';
import DetailPostComment from '../components/DetailPostComment';
import Aside from '../../../shared/layout/aside/container/Aside';
import { isImageUrlValid } from '../../../shared/utils';

import noImage from '../../../../assets/images/no-image.png';
import avaDefault from '../../../../assets/images/user-default.png';

const DetailPost = () => {
  const dispatch = useDispatch();

  const post: PostModel = useSelector((state: RootState) => state.detail.data);
  const isLoading = useSelector((state: RootState) => state.detail.isLoading);
  const isError = useSelector((state: RootState) => state.detail.isError);

  const { id } = useParams();
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isErrorCover, setIsErrorCover] = useState(false);
  const [isErrorAvatar, setIsErrorAvatar] = useState(false);

  useEffect(() => {
    isImageUrlValid(post.cover).then((value) => setIsErrorCover(!value));
    isImageUrlValid(post.user?.picture).then((value) => setIsErrorAvatar(!value));
  }, [post, isErrorCover, isErrorAvatar]);

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailBlog(Number(id)) as any);
      dispatch(fetchComments(id) as any);
    }
  }, [id]);

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
      <section className="section section-detail-page">
        <div className="container">
          <div className="row">
            <div className="col col-9">
              <article>
                <DetailPostCover
                  cover={isErrorCover ? noImage : post.cover}
                  title={post.title}
                  authorName={post.user?.displayName}
                  authorAvatar={isErrorAvatar ? avaDefault : post.user?.picture}
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
      </section>
    </>
  );
};

export default DetailPost;
