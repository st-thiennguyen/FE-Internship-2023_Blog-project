import { PostModel } from '../../../models/post';

interface PostReactionProps {
  post: PostModel;
}

const DetailPostReaction = ({ post }: PostReactionProps) => {
  const { likes, comments } = post;
  return (
    <div className="detail-action">
      <ul className="action-list">
        <li className="action-item d-flex item-center">
          <button className="btn btn-post-action">
            <i className="icon icon-small icon-fire-ouline-20"></i>
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
