import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { PostModel } from '../../../models/post';
import PostItem from '../../../shared/components/PostItem';
import EmptyPost from '../../home/components/EmptyPost';

interface UserPostListProps {
  postList: PostModel[];
}

const UserPostList = ({ postList }: UserPostListProps) => {
  const userProfile = useSelector((state: RootState) => state.profile.data);

  const { id } = useParams();

  return (
    <ul className={`user-post-list row ${!id && 'my-post'}`}>
      {postList?.length > 0 ? (
        postList.map((post, index) => {
          return (
            <li className="post-item col col-4 col-md-12" key={index}>
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
