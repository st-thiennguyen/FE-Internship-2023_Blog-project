import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserModel } from '../../../../models/post';
import { fetchUsers } from '../../../../pages/home/home.actions';
import { RootState } from '../../../../stores/store';
import TopFollower from '../components/TopFollower';
import TopPost from '../components/TopPost';

const Aside = () => {
  const users = useSelector((state: RootState) => state.user.data);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const filterTopFollower = (users: UserModel[]) => {
    const sortUsers = users.sort((a, b) => b.followings - a.followings);
    const top5Follower = sortUsers.slice(0, 5);
    return top5Follower;
  };

  return (
    <aside className="aside">
      <div className="row">
        <div className="col col-12 col-lg-6 col-sm-12">
          <TopFollower users={filterTopFollower(users)} />
        </div>
        <div className="col col-12 col-lg-6 col-sm-12">
          <TopPost />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
