import { Link } from 'react-router-dom';

import { PostModel } from '../../models/post';

interface PostItemProps {
  post: PostModel;
}
const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link to={'/'}>
      <li className="post-item">
        <div className="post">
          <img src={post.cover} alt={post.title} className="post-img" />
          <div className="post-body-wrapper">
            <div className="post-body">
              <span className="post-author">{post.user.displayName}</span>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>
            </div>
            <div className="post-footer d-flex justify-between">
              <span className="read-more">READ MORE</span>
              <ul className="post-reaction-list d-flex item-center">
                <div className="post-reaction-item d-flex">
                  <i className="icon icon-small icon-like-black"></i>
                  <span className="post-reaction-number">{post.likes}</span>
                </div>
                <div className="post-reaction-item d-flex">
                  <i className="icon icon-small icon-comment-black"></i>
                  <span className="post-reaction-number">{post.comments}</span>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default PostItem;
