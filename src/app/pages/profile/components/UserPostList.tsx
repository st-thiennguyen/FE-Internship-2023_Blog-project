import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { PostModel } from '../../../models/post';
import PostItem from '../../../shared/components/PostItem';
import EmptyPost from '../../../shared/components/EmptyPost';

interface UserPostListProps {
  postList: PostModel[];
}

const UserPostList = ({ postList }: UserPostListProps) => {
  const userProfile = useSelector((state: RootState) => state.profile.data);
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);

  const { id } = useParams();

  return (
    <ul className={`user-post-list row ${!id && 'my-post'}`}>
      {postList.length > 0 || isLoading ? (
        postList.map((post, index) => {
          return (
            <li className="post-item col col-3 col-lg-4 col-md-6 col-sm-12" key={index}>
              <PostItem post={{ ...post, user: userProfile }} isVertical={true} />
            </li>
          );
        })
      ) : (
        <div className="user-post-empty">
          <EmptyPost
            desc={
              id
                ? `${userProfile.displayName || userProfile.firstName}'s post list is empty`
                : 'Publish your first post now'
            }
          />
        </div>
      )}
    </ul>
  );
};

export default UserPostList;
