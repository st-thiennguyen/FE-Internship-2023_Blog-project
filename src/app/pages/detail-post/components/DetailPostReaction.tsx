import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { PostModel } from '../../../models/post';

interface PostReactionProps {
  post: PostModel;
}

const DetailPostReaction = ({ post }: PostReactionProps) => {
  const { likes, comments } = post;

  const likeList = useSelector((state: RootState) => state.detail.likes);
  const userId = useSelector((state: RootState) => state.auth.auth?.userInfo.id);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likeList.some((user) => user.id === userId));
  }, []);

  return (
    <div className="detail-action">
      <ul className="action-list">
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action">
            <i className={`icon icon-small ${isLiked ? 'icon-fire-fill-20' : 'icon-fire-outline-20'}`}></i>
          </button>
          <span className="action-count">{likes}</span>
        </li>
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action">
            <i className="icon icon-small icon-comment-20"></i>
          </button>
          <span className="action-count">{comments}</span>
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
