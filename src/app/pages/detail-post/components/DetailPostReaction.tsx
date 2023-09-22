import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { PostModel } from '../../../models/post';
import { updateLikeAction } from '../detail-post.actions';
import { useParams } from 'react-router-dom';

const DetailPostReaction = () => {
  const post: PostModel = useSelector((state: RootState) => state.detail.data);
  const userId = useSelector((state: RootState) => state.auth.auth?.userInfo.id);
  const likeList = useSelector((state: RootState) => state.detail.likes);
  const isLikeUpdated = useSelector((state: RootState) => state.detail.isLiked);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { postId } = useParams();

  useEffect(() => {
    const initial = likeList.some((user) => user.userId === userId);

    console.log('initial', initial);
    console.log('likelist', likeList);
    setIsLiked(initial);
    console.log('first load is liked', isLiked);
  }, []);

  useEffect(() => {
    setIsLiked(isLikeUpdated);
  }, [isLikeUpdated]);

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
            <i className={`icon icon-small ${isLiked ? 'icon-fire-fill-20' : 'icon-fire-outline-20'}`}></i>
          </button>
          <span className="action-count">{post.likes}</span>
        </li>
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action">
            <i className="icon icon-small icon-comment-20"></i>
          </button>
          <span className="action-count">{post.comments}</span>
        </li>
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action">
            <i className="icon icon-small icon-bookmark-20"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DetailPostReaction;
