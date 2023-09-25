import { useState } from 'react';

import { InteractionItemModel } from '../../../models/interaction';
import { timeAgoFromDate } from '../../../shared/utils';
import { Link } from 'react-router-dom';

interface CommentItemProps {
  commentItem: InteractionItemModel;
}

const CommentItem = ({ commentItem }: CommentItemProps) => {
  const [isErrAvt, setIsErrAvt] = useState(false);

  return (
    <div className="comment d-flex">
      <Link to={`/profile/${commentItem.userId}`}>
        <img
          onError={() => setIsErrAvt(true)}
          src={!isErrAvt ? commentItem.user.picture : require('../../../../assets/images/user-default.png')}
          alt={commentItem.user.displayName}
          className="user-avatar"
        />
      </Link>
      <div className="comment-info d-flex flex-column justify-between">
        <div className="comment-info-top d-flex ">
          <span className="user-name">{commentItem.user.displayName}</span>
          <span className="comment-time">{timeAgoFromDate(commentItem.createdAt)}</span>
        </div>
        <p className="comment-content">{commentItem.comment}</p>
      </div>
    </div>
  );
};

export default CommentItem;
