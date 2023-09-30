import { Link } from 'react-router-dom';

import { PostModel } from '../../../models/post';
import { convertDateToString } from '../../../shared/utils';

import Tags from '../../../shared/components/Tags';
import DetailPostReaction from './DetailPostReaction';

interface DetailPostHeaderProps {
  post: PostModel;
  scrollToComment: () => void;
}
const DetailPostHeader = ({ post, scrollToComment }: DetailPostHeaderProps) => {
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
        <Link to={`/profile/${post.user?.id}`} className="author-info d-flex item-center">
          <div className="author-avatar">
            <img src={post.user?.picture} alt="Avatar of author" />
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
