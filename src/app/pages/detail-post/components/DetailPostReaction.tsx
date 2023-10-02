import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { toggleBookmarkAction, updateLikeAction } from '../detail-post.actions';
import { getLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';

import IconHeart from '../../../shared/components/icon/IconHeart';
import IconComment from '../../../shared/components/icon/IconComment';
import IconBookmark from '../../../shared/components/icon/IconBookmark';
import UserList from '../../../shared/components/UserList';

interface ReactionProps {
  postId: number;
  likeCount: number;
  commentCount: number;
  scrollToComment: () => void;
}

const DetailPostReaction = ({ postId, likeCount, commentCount, scrollToComment }: ReactionProps) => {
  const [isShowLike, setIsShowLike] = useState(false);

  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN, '');
  const isLiked = useSelector((state: RootState) => state.detail.data?.isLiked);
  const isBookmark = useSelector((state: RootState) => state.detail.data?.isInBookmark);
  const likeList = useSelector((state: RootState) => state.detail.likes);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateLike = () => {
    if (postId && isLogin) {
      dispatch(updateLikeAction(postId) as any);
    } else {
      navigate('/auth/login');
    }
  };

  const handleAddBookMark = () => {
    if (postId && isLogin) {
      dispatch(toggleBookmarkAction(postId) as any);
    } else {
      navigate('/auth/login');
    }
  };

  const handleShowList = () => {
    if (likeList.length) {
      setIsShowLike(true);
    }
  };

  const handleClose = () => {
    setIsShowLike(false);
  };

  return (
    <div className="detail-action">
      <ul className="action-list d-flex">
        <li className={`action-item d-flex item-center ${isLiked && isLogin ? 'like-active' : ''}`}>
          <button className="btn btn-post-action  d-flex item-center justify-center" onClick={handleUpdateLike}>
            <IconHeart color={isLiked && isLogin ? '#e11d48' : ''} />
          </button>
          <span className="action-count like-count" onClick={handleShowList}>
            {likeCount}
          </span>
        </li>
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action d-flex item-center justify-center" onClick={scrollToComment}>
            <IconComment />
          </button>
          <span className="action-count">{commentCount}</span>
        </li>
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action  d-flex item-center justify-center" onClick={handleAddBookMark}>
            <IconBookmark color={isBookmark && isLogin ? '#111827' : ''} />
          </button>
        </li>
      </ul>
      {isShowLike && <UserList title="Like list" list={likeList} show={isShowLike} handleClose={handleClose} />}
    </div>
  );
};

export default DetailPostReaction;
