import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { PostModel } from '../../../../models/post';
import { convertDateToString, isImageUrlValid } from '../../../../shared/utils';

import userDefault from '../../../../../assets/images/user-default.png';
import Tags from '../../../../shared/components/Tags';

interface RecommendItemProps {
  post: PostModel;
}
const RecommendItem = ({ post }: RecommendItemProps) => {
  const tags = ['React', 'Vue', 'NodeJS'];
  const [isErrAvt, setIsErrAvt] = useState(false);

  useEffect(() => {
    isImageUrlValid(post.user.picture).then((result) => setIsErrAvt(!result));
  }, [isErrAvt, post.user.picture]);

  return (
    <li className="recommend-post-item col col-4 col-md-6 col-sm-12">
      <div className="post d-flex flex-column justify-between">
        <Tags tags={tags} />
        <Link to={`/posts/${post.id}`}>
          <h3 className="post-title">{post.title}</h3>
        </Link>
        <div className="post-info-wrapper d-flex item-center">
          <Link to={`/profile/${post.userId}`}>
            {isErrAvt ? (
              <img src={userDefault} alt={post.user.displayName} className="user-avatar" />
            ) : (
              <img src={post.user.picture} alt={post.user.displayName} className="user-avatar" />
            )}
          </Link>
          <div className="post-info d-flex flex-column justify-between ">
            <Link to={`/profile/${post.userId}`}>
              <p className="author-name">{post.user.name || `${post.user.firstName} ${post.user.lastName}`}</p>
            </Link>
            <span className="post-date">{convertDateToString(post.createdAt, '-')}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RecommendItem;
