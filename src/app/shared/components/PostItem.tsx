import { useState } from 'react';
import { Link } from 'react-router-dom';

import { PostModel } from '../../models/post';
import { convertDateToString } from '../utils';

interface PostItemProps {
  post: PostModel;
}
const PostItem = ({ post }: PostItemProps) => {
  const [isErrImg, setIsErrImg] = useState(false);
  const [isErrAvt, setIsErrAvt] = useState(false);
  return (
    <Link to={`detail/${post.id}`}>
      <li className="post-item">
        <div className="post">
          <div className="post-img-wrapper">
            <img
              src={!isErrImg ? post.cover : require('../../../assets/images/no-image.png')}
              onError={() => setIsErrImg(true)}
              alt={post.title}
              className={`post-img ${isErrImg ? 'err' : ''}`}
            />
          </div>
          <div className="post-body-wrapper">
            <div className="post-body">
              <div className="post-body-top d-flex item-center">
                <div className="user-info-wrapper d-flex item-center">
                  <img
                    className="user-avatar"
                    onError={() => setIsErrAvt(true)}
                    src={!isErrAvt ? post.cover : require('../../../assets/images/user-default.png')}
                    alt={post.user.displayName}
                  />
                  <span className="user-name">{post.user.displayName}</span>
                </div>
                <p className="post-created-date">{convertDateToString(post.createdAt)}</p>
              </div>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-content">{post.content}</p>
            </div>
            <div className="post-footer d-flex justify-between">
              <span className="read-more">READ MORE</span>
              <ul className="post-reaction-list d-flex item-center">
                <div className="post-reaction-item d-flex">
                  <i className="icon icon-small icon-fire-ouline-20"></i>
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
