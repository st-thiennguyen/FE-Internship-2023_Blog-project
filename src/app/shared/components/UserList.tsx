import { useEffect } from 'react';
import { InteractionItemModel } from '../../models/interaction';
import { UserInfo } from '../../models/auth';
import UserItem from './UserItem';

interface UserListProps {
  title: string;
  show: boolean;
  handleClose: () => void;
  list: InteractionItemModel[] | UserInfo[];
}

const UserList = ({ title, show, list, handleClose }: UserListProps) => {
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
          <h3 className="user-list-title">{title}</h3>
          <div className="btn btn-close" onClick={handleClose}>
            &times;
          </div>
        </div>
        <div className="divided"></div>
        <ul className="user-list">
          {list.map((item, id) => (
            <li className="user-item" key={id}>
              <UserItem user={item.user ? item.user : item} type={title} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
