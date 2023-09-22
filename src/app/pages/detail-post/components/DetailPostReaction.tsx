import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { PostModel } from '../../../models/post';
import { fetchPostLikes, updateLikeAction } from '../detail-post.actions';
import { useNavigate, useParams } from 'react-router-dom';
import ToastMessage from '../../../shared/components/ToastMessage';

interface ReactionProps {
  postId: number;
  likeCount: number;
  commentCount: number;
}

const DetailPostReaction = ({ postId, likeCount, commentCount }: ReactionProps) => {
  const [showToast, setShowToast] = useState(false);
  const isLogin = useSelector((state: RootState) => state.auth.auth?.accessToken);
  const isLiked = useSelector((state: RootState) => state.detail.data?.isLiked);

  const dispatch = useDispatch();

  const handleUpdateLike = () => {
    if (postId && isLogin) {
      dispatch(updateLikeAction(postId) as any);
    } else {
      setShowToast(!showToast);
    }
  };

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
          <button className="btn btn-post-action">
            <i className="icon icon-small icon-comment-20"></i>
          </button>
          <span className="action-count">{commentCount}</span>
        </li>
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action">
            <i className="icon icon-small icon-bookmark-20"></i>
          </button>
        </li>
      </ul>

      {showToast && (
        <ToastMessage
          isShow={showToast}
          isSuccess={false}
          title={'Error'}
          subtitle={'This action must be login'}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default DetailPostReaction;
