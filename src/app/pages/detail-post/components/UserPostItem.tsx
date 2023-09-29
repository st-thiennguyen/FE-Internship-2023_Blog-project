import { Link } from 'react-router-dom';
import { PostModel } from '../../../models/post';
import IconComment from '../../../shared/components/icon/IconComment';
import IconHeart from '../../../shared/components/icon/IconHeart';
import { convertDateToString } from '../../../shared/utils';

interface UserPostItemProps {
  post: PostModel;
}
const UserPostItem = ({ post }: UserPostItemProps) => {
  return (
    <li className="user-post-item" title={post.title}>
      <Link to={`/posts/${post.id}`} className="user-post d-flex">
        <div className="upost-cover">
          <img src={post.cover} alt={post.title} />
        </div>
        <div className="upost-info d-flex flex-column">
          <h4 className="upost-title text-truncate-1">{post.title}</h4>
          <div className="upost-reaction d-flex">
            <div className="d-flex item-center">
              <IconHeart /> <span className="reaction-count">{post.likes}</span>
            </div>
            <div className="d-flex item-center">
              <IconComment /> <span className="reaction-count">{post.comments}</span>
            </div>
          </div>
          <p className="upost-date text-end">{convertDateToString(post.createdAt, '-')}</p>
        </div>
      </Link>
    </li>
  );
};

export default UserPostItem;
