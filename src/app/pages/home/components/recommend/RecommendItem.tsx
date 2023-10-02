import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { PostModel } from '../../../../models/post';
import { isImageUrlValid } from '../../../../shared/utils';

import Tags from '../../../../shared/components/Tags';
import IconHeart from '../../../../shared/components/icon/IconHeart';
import IconComment from '../../../../shared/components/icon/IconComment';
import NoImg from '../../../../../assets/images/no-image.png';

interface RecommendItemProps {
  post: PostModel;
}
const RecommendItem = ({ post }: RecommendItemProps) => {
  const [isErrImg, setIsErrImg] = useState(false);
  const [isErrAvt, setIsErrAvt] = useState(false);

  useEffect(() => {
    isImageUrlValid(post.cover).then((result) => setIsErrImg(!result));
  }, [isErrImg, post.cover]);

  return (
    <Link to={`/posts/${post.id}`} className="recommend-link">
      <div className="recommend-item">
        <div className="recommend d-flex flex-column">
          <Tags tags={post.tags} />
          <div className="recommend-cover">
            <img className="recommend-cover-img" src={isErrImg ? NoImg : post.cover} alt={post.description} />
          </div>
          <div className="recommend-content">
            <h3 className="recommend-title">{post.title}</h3>
            <div className="recommend-author d-flex item-center flex-row">
              <Link to={`profile/${post.userId}`} className="d-flex">
                <div className="author-avatar">
                  <img
                    onError={() => setIsErrAvt(true)}
                    src={!isErrAvt ? post.user.picture : require('../../../../../assets/images/user-default.png')}
                    alt={post.user.displayName}
                  />
                </div>
                <span className="author-name">{post.user.displayName}</span>
              </Link>
            </div>
            <div className="recommend-footer d-flex justify-between">
              <ul className="reaction-list d-flex item-center">
                <li className="reaction-item d-flex item-center">
                  <div className="icon-like-wrapper d-flex item-center justify-center">
                    <IconHeart />
                  </div>
                  {post.likes}
                </li>
                <li className="reaction-item d-flex item-center">
                  <div className="icon-comment-wrapper d-flex item-center justify-center">
                    <IconComment />
                  </div>
                  {post.comments}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecommendItem;
