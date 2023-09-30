import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { toggleBookmarkAction, updateLikeAction } from '../detail-post.actions';

import { getLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';

interface ReactionProps {
  postId: number;
  likeCount: number;
  commentCount: number;
  scrollToComment: () => void;
}

const DetailPostReaction = ({ postId, likeCount, commentCount, scrollToComment }: ReactionProps) => {
  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN, '');
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
      dispatch(toggleBookmarkAction(postId) as any)
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
          <button className="btn btn-post-action" onClick={handleAddBookMark}>
            {
              isLogin ? !isBookmark ?
                <i className="icon icon-small icon-bookmark-20"></i> :
                <i className='icon icon-small icon-bookmark-blue-20'></i> :
                <i className="icon icon-small icon-bookmark-20"></i>
            }
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DetailPostReaction;
