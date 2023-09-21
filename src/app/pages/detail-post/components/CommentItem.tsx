import { CommentItemModel } from '../../../models/comment';
import { timeAgoFromDate } from '../../../shared/utils';

interface CommentItemProps {
  commentItem: CommentItemModel;
}

const CommentItem = ({ commentItem }: CommentItemProps) => {
  return (
    <div className="comment d-flex">
      <img
        src={require('../../../../assets/images/demo-cover.jpg')}
        alt={commentItem.user.displayName}
        className="user-avatar"
      />
      <div className="comment-info d-flex flex-column justify-between">
        <div className="comment-info-top d-flex ">
          <span className="user-name">{commentItem.user.displayName}</span>
          <span className="comment-createdAt">{timeAgoFromDate(commentItem.createdAt)}</span>
        </div>
        <p className="comment-content">{commentItem.comment}</p>
      </div>
    </div>
  );
};

export default CommentItem;
