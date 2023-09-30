import { useEffect } from 'react';
import { InteractionItemModel } from '../../models/interaction';
import UserItem from './UserItem';

interface UserListProps {
  show: boolean;
  handleClose: () => void;
  likes: InteractionItemModel[];
}

const UserList = ({ show, likes, handleClose }: UserListProps) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  return (
    <div className="user-list-backdrop">
      <div className="user-list-wrapper">
        <div className="user-list-header d-flex item-center justify-between">
          <h3 className="user-list-title">Like list</h3>
          <div className="btn btn-close" onClick={handleClose}>
            &times;
          </div>
        </div>
        <div className="divided"></div>
        <ul className="user-list">
          {likes.map((item, id) => (
            <li className="user-item" key={id}>
              <UserItem user={item.user} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
