import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { fetchBookmark, updateLikeAction } from '../detail-post.actions';

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
  const isLiked = useSelector((state: RootState) => state.detail.data?.isLiked);
  const isSuccess = useSelector((state: RootState) => state.detail.isSuccess);
  const isError = useSelector((state: RootState) => state.detail.isError);
  const postListBorkmark = useSelector((state: RootState) => state.bookmark.data);
  const [isBookmark, setIsBookMark] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateLike = () => {
    if (postId) {
      dispatch(updateLikeAction(postId) as any);
    }
  };

  const handleAddBookMark = () => {
    if (postId) {
      addBookmark(postId, () => {
        dispatch(fetchBookmark() as any);
      });
    }
  }

  useEffect(() => {
    const newIsBookMark = postListBorkmark.some((item) => {
      return Number(item.postId) === postId && item.post;
    })
    setIsBookMark(newIsBookMark);
  }, [postListBorkmark])

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
        <li className="action-item d-flex item-center" onClick={handleAddBookMark}>
          <button className="btn btn-post-action"> {
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
