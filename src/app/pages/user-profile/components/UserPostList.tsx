import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { ProfileModel } from '../../../models/user';
import { PostModel } from '../../../models/post';

import PostItem from '../../../shared/components/PostItem';
import EmptyPost from '../../home/components/EmptyPost';

interface UserPostListProps {
  postList: ProfileModel;
}

const UserPostList = ({ postList }: UserPostListProps) => {
  const posts: PostModel[] = postList.Posts;
  const userProfile = useSelector((state: RootState) => state.userProfile.profile);

  const { id } = useParams();
  return (
    <ul className={`user-post-list row ${!id && 'my-post'}`}>
      {posts?.length > 0 ? (
        posts.map((post, index) => {
          return (
            <li className="post-item col col-6 col-md-12" key={index}>
              <PostItem post={{ ...post, user: userProfile }} />
            </li>
          );
        })
      ) : (
        <div className="user-post-empty">
          <EmptyPost />
        </div>
      )}
    </ul>
  );
};

export default UserPostList;
