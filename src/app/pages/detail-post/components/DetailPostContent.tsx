import { RefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { PostModel } from '../../../models/post';
import { convertDateToString, isImageUrlValid } from '../../../shared/utils';

import Tags from '../../../shared/components/Tags';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPostAction, getUserProfileAction } from '../../profile/profile.actions';
import { RootState } from '../../../stores/store';
import UserPostItem from './UserPostItem';
import DetailPostComment from './DetailPostComment';

interface DetailPostProps {
  post: PostModel;
  commentRef: RefObject<HTMLDivElement>;
}

const DetailPostContent = ({ post, commentRef }: DetailPostProps) => {
  const [isErrorCover, setIsErrorCover] = useState(false);

  const userPosts = useSelector((state: RootState) => state.profile.data.posts);

  const postList = userPosts?.slice(0, 4);

  const dispatch = useDispatch();

  useEffect(() => {
    isImageUrlValid(post.user?.picture).then((value) => setIsErrorCover(!value));
  }, [post.user?.picture]);

  const removeEmptyTags = (htmlString: string) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const tagsToRemove = doc.querySelectorAll('*:empty');
    tagsToRemove.forEach((tag) => {
      tag.remove();
    });
    return doc.body.innerHTML;
  };

  useEffect(() => {
    if (post.user?.id) {
      dispatch(getUserPostAction(`${post.user?.id}`) as any);
    }
  }, [post.user?.id]);

  return (
    <>
      <div className="detail-post">
        <div className="detail-post-body">
          <div className="row">
            <div className="detail-body col col-8 col-xl-12">
              <article>
                <div className="post-content" dangerouslySetInnerHTML={{ __html: removeEmptyTags(post.content) }}></div>
              </article>
              <div className="divided"></div>
              <DetailPostComment ref={commentRef} />
            </div>
            <div className="col col-4 col-xl-12">
              <aside className="aside aside-detail d-flex flex-column">
                <div className="detail-author">
                  <Link to={`/profile/${post.user?.id}`} className="detail-author-link d-flex item-center">
                    <div className="author-info flex-1">
                      <h5 className="author-name text-truncate-1">{post.user?.displayName} </h5>
                      <p className="author-email text-truncate-1">{post.user?.email}</p>
                      <p className="author-gender text-truncate-1">Gender : {post.user?.gender}</p>
                      <div className="author-connect d-flex">
                        <span className="follow">
                          <span className="follow-label">Follower : </span> {post.user?.followers}
                        </span>
                        <span className="follow">
                          {' '}
                          <span className="follow-label">Followings : </span> {post.user?.followings}
                        </span>
                      </div>
                    </div>
                    <div className="author-img">
                      <img src={post.user?.picture} alt="Image of author" />
                    </div>
                  </Link>
                </div>
                <div className="detail-author-post">
                  <div className="author-posts">
                    <h3 className="author-post-title">{post.user?.firstName}'s recent posts </h3>
                    <div className="divided"></div>
                    <ul className="user-post-list d-flex flex-column">
                      {postList && postList.map((e: PostModel) => <UserPostItem post={e} />)}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
        {/* <div className="detail-author text-center d-flex justify-center">
          <Link to="/" className="detail-author-action d-flex flex-column item-center">
            <div className="author-img d-flex">
              <img src={!isErrorCover ? post.user?.picture : avaDefault} alt={post.user?.displayName} />
            </div>
            <p className="author-name">{post.user?.displayName}</p>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default DetailPostContent;
