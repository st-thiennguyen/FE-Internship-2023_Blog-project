import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { updateLikeAction } from '../detail-post.actions';

import ToastMessage from '../../../shared/components/ToastMessage';

interface ReactionProps {
  postId: number;
  likeCount: number;
  commentCount: number;
}

const DetailPostReaction = ({ postId, likeCount, commentCount }: ReactionProps) => {
  const isLogin = useSelector((state: RootState) => state.auth.auth?.accessToken);
  const isLiked = useSelector((state: RootState) => state.detail.data?.isLiked);
  const isSuccess = useSelector((state: RootState) => state.detail.isSuccess);
  const isError = useSelector((state: RootState) => state.detail.isError);

  const dispatch = useDispatch();

  const handleUpdateLike = () => {
    if (postId) {
      dispatch(updateLikeAction(postId) as any);
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

      {isError && (
        <ToastMessage isShow={isError} isSuccess={isSuccess} title="Success" subtitle="Login to do this action" />
      )}
    </div>
  );
};

export default DetailPostReaction;
