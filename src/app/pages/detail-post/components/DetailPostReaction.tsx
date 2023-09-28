import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { fetchBookmark, toggleBookmark, updateBookmark, updateLikeAction } from '../detail-post.actions';

import ToastMessage from '../../../shared/components/ToastMessage';
import { addBookmark } from '../../../shared/services/user.service';
import { getLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';
import { useEffect, useState } from 'react';
import icBookmarkBlue from '../../../../assets/icons/ic-bookmark-blue-20.svg';

interface ReactionProps {
  postId: number;
  likeCount: number;
  commentCount: number;
  scrollToComment: () => void;
}

const DetailPostReaction = ({ postId, likeCount, commentCount, scrollToComment }: ReactionProps) => {
  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN, '');
  const isSuccess = useSelector((state: RootState) => state.detail.isSuccess);
  const isError = useSelector((state: RootState) => state.detail.isError);
  const isLiked = useSelector((state: RootState) => state.detail.data?.isLiked);
  const isBookmark = useSelector((state: RootState) => state.detail.data?.isInBookmark);
  const dispatch = useDispatch();

  const handleUpdateLike = () => {
    if (postId) {
      dispatch(updateLikeAction(postId) as any);
    }
  };

  const handleAddBookMark = () => {
    if (postId) {
      dispatch(toggleBookmark(postId) as any)
    }
  }

  return (
    <div className="detail-action">
      <ul className="action-list">
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action" onClick={handleUpdateLike}>
            <i className={`icon icon-small ${isLiked && isLogin ? 'icon-fire-fill-20' : 'icon-fire-outline-20'}`}></i>
          </button>
          <span className="action-count">{likeCount}</span>
        </li>
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action" onClick={scrollToComment}>
            <i className="icon icon-small icon-comment-20"></i>
          </button>
          <span className="action-count">{commentCount}</span>
        </li>
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action" onClick={handleAddBookMark}> {
            !isBookmark ? <i className="icon icon-small icon-bookmark-20"></i> :
              <img src={icBookmarkBlue} alt="icon bookmark" className='icon icon-small ic-bookmark-blue-20' />
          }
          </button>
        </li>
      </ul>

      {isError && (
        <ToastMessage isShow={isError} isSuccess={isSuccess} title="Success" subtitle="Login to do this action" />
      )}
    </div>
  );
};

export default DetailPostReaction;
