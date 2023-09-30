import { InteractionItemModel } from '../../models/interaction';
import UserItem from './UserItem';

interface UserListProps {
  likes: InteractionItemModel[];
}

const UserList = ({ likes }: UserListProps) => {
  return (
    <div className="user-list-wrapper">
      <ul className="user-list">
        {likes.map((item, id) => (
          <li className="user-item" key={id}>
            <UserItem user={item.user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
