import { RefObject, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { PostModel } from '../../../models/post';
import { RootState } from '../../../stores/store';
import { StorageKey } from '../../../shared/constants';
import { getLocalStorage, isImageUrlValid } from '../../../shared/utils';
import { getUserPostAction } from '../../profile/profile.actions';

import UserPostItem from './UserPostItem';
import DetailPostComment from './DetailPostComment';

import avatarDefault from '../../../../assets/images/user-default.png';

interface DetailPostProps {
  post: PostModel;
  commentRef: RefObject<HTMLDivElement>;
}

const DetailPostContent = ({ post, commentRef }: DetailPostProps) => {
  const [isErrorAvatar, setIsErrorAvatar] = useState(false);

  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN) || false;

  const userPosts = useSelector((state: RootState) => state.profile.data.posts);

  const isSuccess = useSelector((state: RootState) => state.detail.isSuccess);

  const postList = userPosts?.slice(0, 4).filter((item) => item.id !== post.id);

  const dispatch = useDispatch();

  useEffect(() => {
    post.user?.picture && isImageUrlValid(post.user?.picture).then((value) => setIsErrorAvatar(!value));
  }, [isSuccess]);

  const removeEmptyTags = (htmlString: string) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const tagsToRemove = doc.querySelectorAll('*:empty');
    tagsToRemove.forEach((tag) => {
      tag.remove();
    });
    return doc.body.innerHTML;
  };

  useEffect(() => {
    if (post.user?.id && isLogin) {
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
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: post.content ? removeEmptyTags(post.content) : '' }}
                ></div>
              </article>
              <div className="divided"></div>
              <DetailPostComment ref={commentRef} />
            </div>
            <div className="col col-4 col-xl-12">
              <aside className="aside aside-detail d-flex flex-column">
                <div className="detail-author">
                  <Link to={`/profile/${post.user?.id}`} className="detail-author-link d-flex item-center">
                    <div className="author-info flex-1">
                      <h5 className="author-name text-truncate-1">
                        {post.user?.displayName || post.user?.firstName + ' ' + post.user?.lastName}
                      </h5>
                      <p className="author-email text-truncate-1">{post.user?.email}</p>
                      <p className="author-gender text-truncate-1">Gender : {post.user?.gender || '----'}</p>
                      <div className="author-connect d-flex">
                        <span className="follow">
                          <span className="follow-label">Followers : </span> {post.user?.followers}
                        </span>
                        <span className="follow">
                          <span className="follow-label">Following : </span> {post.user?.followings}
                        </span>
                      </div>
                    </div>
                    <div className="author-img">
                      <img src={!isErrorAvatar ? post.user?.picture : avatarDefault} alt="avatar" />
                    </div>
                  </Link>
                </div>
                {isLogin && postList && (
                  <div className="detail-author-post">
                    <div className="author-posts">
                      <h3 className="author-post-title">
                        {post.user?.displayName || post.user?.firstName}'s recent posts
                      </h3>
                      <div className="divided"></div>
                      <ul className="user-post-list d-flex flex-column">
                        {postList && postList.map((item: PostModel) => <UserPostItem key={post.id} post={item} />)}
                      </ul>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPostContent;
