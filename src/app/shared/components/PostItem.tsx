import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../stores/store';
import { PostModel } from '../../models/post';
import { deletePost } from '../../pages/profile/profile.actions';
import { isImageUrlValid } from '../utils';
import { convertDateToString } from '../utils/date';

import Modal from './Modal';
import NoImg from '../../../assets/images/no-image.png';
import { restorePostAction } from '../../pages/posts/posts.action';

interface PostItemProps {
  post: PostModel;
  onClickBookmark?: () => void;
}
const PostItem = ({ post, onClickBookmark }: PostItemProps) => {
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

  return (
    <>
      <div className="post">
        <div className="post-delete d-flex item-center justify-center" onClick={handleShowModal}>
          <i className="icon icon-small icon-delete icon-trash-20"></i>
          <i className="icon icon-small icon-delete icon-trash-fill-20"></i>
        </div>
        <div className="post-restore" onClick={handleShowModalRestore}>
          <i className="icon icon-xxl icon-restore-60"></i>
        </div>

        <div className="post-bookmark d-hidden" onClick={onClickBookmark}>
          <i className="icon icon-large icon-bookmark-fill" />
          <span className="remove-bookmark">&times;</span>
        </div>
        <div className="post-img-wrapper">
          <Link to={`/posts/${post.id}`}>
            {isErrImg ? (
              <img src={NoImg} alt={post.title} className={`post-img err`} />
            ) : (
              <img src={post.cover} alt={post.title} className={`post-img`} />
            )}
          </Link>
        </div>
        <div className="post-body-wrapper">
          <div className="post-body">
            <div className="post-body-top d-flex item-center">
              <Link to={`/profile/${post.userId}`} className="user-info-wrapper d-flex item-center">
                <img
                  className="user-avatar"
                  onError={() => setIsErrAvt(true)}
                  src={!isErrAvt ? post.user.picture : require('../../../assets/images/user-default.png')}
                  alt={post.user.displayName}
                />
                <span className="user-name">{post.user.displayName}</span>
              </Link>
              <p className="post-created-date">{convertDateToString(post.createdAt, '-')}</p>
            </div>
            <Link to={`/posts/${post.id}`}>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-desc">{post.description.replace(/<[^>]*>/g, '')}</p>
            </Link>
          </div>
          <div className="post-footer d-flex justify-between">
            <span className="read-more">READ MORE</span>
            <ul className="post-action-list">
              <li className="post-action-item">
                <Link onClick={(e) => e.stopPropagation()} className="post-action-link" to={`/posts/${post.id}/edit`}>
                  <i className="icon icon-small icon-write-20"></i>
                </Link>
              </li>
            </ul>
            <ul className="post-reaction-list d-flex item-center">
              <div className="post-reaction-item d-flex">
                <i className="icon icon-small icon-fire-outline-20"></i>
                <span className="post-reaction-number">{post.likes}</span>
              </div>
              <div className="post-reaction-item d-flex">
                <i className="icon icon-small icon-comment-black"></i>
                <span className="post-reaction-number">{post.comments}</span>
              </div>
            </ul>
          </div>
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
