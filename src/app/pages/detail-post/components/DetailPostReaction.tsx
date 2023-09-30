import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { toggleBookmarkAction, updateLikeAction } from '../detail-post.actions';

import { getLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';

import IconHeart from '../../../shared/components/icon/IconHeart';
import IconComment from '../../../shared/components/icon/IconComment';
import IconBookmark from '../../../shared/components/icon/IconBookmark';

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
  const navigate = useNavigate();

  const handleUpdateLike = () => {
    if (postId && isLogin) {
      dispatch(updateLikeAction(postId) as any);
    } else {
      navigate('/login');
    }
  };

  const handleAddBookMark = () => {
    if (postId && isLogin) {
      dispatch(toggleBookmarkAction(postId) as any);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="detail-action">
      <ul className="action-list d-flex">
        <li className={`action-item d-flex item-center ${isLiked ? 'like-active' : ''}`}>
          <button className="btn btn-post-action" onClick={handleUpdateLike}>
            <IconHeart color={isLiked ? '#e11d48' : ''} />
          </button>
          <span className="action-count">{likeCount}</span>
        </li>
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action" onClick={scrollToComment}>
            <IconComment />
          </button>
          <span className="action-count">{commentCount}</span>
        </li>
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action" onClick={handleAddBookMark}>
            <IconBookmark color={isBookmark ? '#111827' : ''} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DetailPostReaction;
