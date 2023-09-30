import { UserInfo } from '../../models/auth';

interface UserItemProps {
  user: UserInfo;
}

const UserItem = ({ user }: UserItemProps) => {
  return <div>{user.displayName}</div>;
};

export default UserItem;
