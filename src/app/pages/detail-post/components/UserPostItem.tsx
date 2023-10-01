import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { PostModel } from '../../../models/post';
import { convertDateToString, isImageUrlValid } from '../../../shared/utils';

import IconComment from '../../../shared/components/icon/IconComment';
import IconHeart from '../../../shared/components/icon/IconHeart';
import noImage from '../../../../assets/images/no-image.png';

interface UserPostItemProps {
  post: PostModel;
}
const UserPostItem = ({ post }: UserPostItemProps) => {
  const [isErrorCover, setIsErrorCover] = useState(false);

  useEffect(() => {
    isImageUrlValid(post.cover).then((value) => setIsErrorCover(!value));
  }, [post.cover]);

  return (
    <li className="user-post-item" title={post.title}>
      <Link to={`/posts/${post.id}`} className="user-post d-flex">
        <div className="upost-cover">
          <img src={!isErrorCover ? post.cover : noImage} alt={post.title} />
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
