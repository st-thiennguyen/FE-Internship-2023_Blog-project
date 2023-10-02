import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { PostModel } from '../../../models/post';
import { convertDateToString, isImageUrlValid } from '../../../shared/utils';

import Tags from '../../../shared/components/Tags';
import DetailPostReaction from './DetailPostReaction';
import avatarDefault from '../../../../assets/images/user-default.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';

interface DetailPostHeaderProps {
  post: PostModel;
  scrollToComment: () => void;
}

const DetailPostHeader = ({ post, scrollToComment }: DetailPostHeaderProps) => {
  const [isErrorAvatar, setIsErrorAvatar] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);

  useEffect(() => {
    isImageUrlValid(post.user?.picture).then((value) => setIsErrorAvatar(!value));
  }, [post, isErrorAvatar]);

  return (
    <div className="detail-header">
      <div className="detail-header-tags">
        <ul className="detail-tags-list d-flex flex-wrap">
          <Tags tags={post.tags} showAll={true} />
        </ul>
      </div>
      <h2 className="detail-header-title">{post.title}</h2>
      <div className="detail-header-desc">{post.description}</div>
      <div className="divided" />
      <div className="detail-header-author d-flex item-center justify-between">
        <Link
          to={`/profile${userId !== post.user?.id ? `/${post.user?.id}` : ''}`}
          className="author-info d-flex item-center"
        >
          <div className="author-avatar">
            <img src={!isErrorAvatar ? post.user?.picture : avatarDefault} alt="Image of author" />
          </div>
          <div className="detail-author-date">
            <h5 className="author-name">
              {post.user?.displayName || post.user?.firstName + ' ' + post.user?.lastName}
            </h5>
            <span className="post-date">{convertDateToString(post.createdAt, '-')}</span>
          </div>
        </Link>
        <DetailPostReaction
          postId={post.id}
          likeCount={post.likes}
          commentCount={post.comments}
          scrollToComment={scrollToComment}
        />
      </div>
    </div>
  );
};

export default DetailPostHeader;
