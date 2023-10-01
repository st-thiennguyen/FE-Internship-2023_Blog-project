import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PostModel } from '../../models/post';
import { deletePost } from '../../pages/profile/profile.actions';
import { isImageUrlValid } from '../utils';
import { convertDateToString } from '../utils/date';

import Modal from './Modal';
import NoImg from '../../../assets/images/no-image.png';
import userDefault from '../../../assets/images/user-default.png';
import Tags from './Tags';
import { restorePostAction } from '../../pages/posts/posts.action';
import IconComment from './icon/IconComment';
import IconHeart from './icon/IconHeart';
import IconBookmark from './icon/IconBookmark';

interface PostItemProps {
  post: PostModel;
  isInBookmark?: boolean;
  onClickBookmark?: (id: number) => void;
  isVertical?: boolean;
}
const PostItem = ({ post, onClickBookmark, isInBookmark, isVertical }: PostItemProps) => {
  const [isErrImg, setIsErrImg] = useState(false);
  const [isErrAvt, setIsErrAvt] = useState(false);

  const [isShowModalRestore, setShowModalRestore] = useState(false);

  const dispatch = useDispatch();

  const handleDeletePostItem = (id: string) => {
    dispatch(deletePost(id) as any);
  };
  const [isShowModal, setIShowModal] = useState(false);

  const handleClose = () => {
    setIShowModal(false);
    setShowModalRestore(false);
  };

  const handleDelete = () => {
    handleDeletePostItem(post.id as any);
    setIShowModal(false);
  };

  const handleRestoreItem = () => {
    dispatch(restorePostAction(post.id) as any);
    setShowModalRestore(false);
  };

  const handleShowModal = () => {
    setIShowModal(!isShowModal);
  };

  const handleShowModalRestore = () => {
    setShowModalRestore(!isShowModalRestore);
  };

  useEffect(() => {
    isImageUrlValid(post.cover).then((result) => setIsErrImg(!result));
  }, [isErrImg, post.cover]);

  useEffect(() => {
    isImageUrlValid(post.user.picture).then((result) => setIsErrAvt(!result));
  }, [isErrAvt, post.user.picture]);

  return (
    <>
      <div className={`post d-flex item-center ${isVertical && 'post-vertical'}`}>
        <div className="post-action d-flex">
          <div className="post-delete d-flex item-center justify-center" onClick={handleShowModal}>
            <i className="icon icon-small icon-delete icon-trash-20"></i>
            <i className="icon icon-small icon-delete icon-trash-fill-20"></i>
          </div>
          <div className="post-edit d-flex item-center justify-center">
            <Link to={`/posts/${post.id}/edit`} className="post-edit-link d-flex item-center justify-center">
              <i className="icon icon-small icon-edit-20"></i>
            </Link>
          </div>
        </div>
        <div className="post-restore" onClick={handleShowModalRestore}>
          <i className="icon icon-xxl icon-restore-60"></i>
        </div>
        <div className="post-content-wrapper d-flex flex-column justify-between">
          <Tags tags={post.tags} />

          <div className="post-content-body d-flex justify-between flex-column">
            <div className="d-flex flex-column post-content">
              <Link to={`/posts/${post.id}`} className="post-link">
                <h4 className="post-title">{post.title}</h4>
              </Link>
              <Link to={`/posts/${post.id}`} className="post-link">
                <p className="post-desc">{post.description}</p>
              </Link>
            </div>
            <div className="post-info d-flex item-center">
              <div className="post-author d-flex item-center">
                <Link to={`/profile/${post.userId}`} className="post-link d-flex item-center">
                  {isErrAvt ? (
                    <img src={userDefault} alt={post.user.displayName} className="author-avatar" />
                  ) : (
                    <img src={post.user.picture} alt={post.user.displayName} className="author-avatar" />
                  )}
                </Link>
                <Link to={`/profile/${post.userId}`} className="post-link d-flex item-center">
                  <span className="author-name">{post.user.displayName}</span>
                </Link>
              </div>
              <span className="post-date">{convertDateToString(post.createdAt, '-')}</span>
            </div>
          </div>
          <div className="post-content-footer d-flex item-center justify-between">
            <ul className="reaction-list d-flex item-center">
              <li className="reaction-item d-flex item-center">
                <div className="icon-like-wrapper d-flex item-center justify-center">
                  <IconHeart />
                </div>
                {post.likes}
              </li>
              <li className="reaction-item d-flex item-center">
                <div className="icon-comment-wrapper d-flex item-center justify-center">
                  <IconComment />
                </div>
                {post.comments}
              </li>
            </ul>
            <div
              className="icon-bookmark-wrapper d-flex item-center justify-center"
              onClick={() => onClickBookmark?.(post.id)}
            >
              <IconBookmark color={isInBookmark ? '#111827' : ''} />
            </div>
          </div>
        </div>
        <div className="post-img-wrapper d-flex item-center">
          <Link to={`/posts/${post.id}`} className="post-link">
            {!isErrImg ? (
              <img src={post.cover} alt={post.title} className="post-cover" />
            ) : (
              <img src={NoImg} alt={post.title} className="post-cover err" />
            )}
          </Link>
        </div>
      </div>

      <Modal onClickClose={handleClose} onClickConfirm={handleRestoreItem} isShow={isShowModalRestore}>
        <h4 className="modal-title">Restore</h4>
        <p>Do you want restore this post ?</p>
      </Modal>

      <Modal onClickClose={handleClose} onClickConfirm={handleDelete} isShow={isShowModal}>
        <h4 className="modal-title">Delete</h4>
        <p>Do you really want to delete?</p>
      </Modal>
    </>
  );
};

export default PostItem;
