import { CommentItemModel } from '../../../models/comment';
import { timeAgoFromDate } from '../../../shared/utils';
import CommentItem from './CommentItem';

const listComment: CommentItemModel[] = [
  {
    id: 31,
    userId: 132,
    postId: 74,
    comment: 'Đi ngủ đi mấy cậu',
    createdAt: '2023-09-19T15:30:36.929Z',
    user: {
      id: 132,
      email: 'tiendn@gmail.com',
      firstName: 'Tien',
      lastName: 'Dinh',
      phone: '123456789',
      gender: 'male',
      dob: '30/04/2001',
      displayName: 'Dr.Tien',
      picture: 'null',
      followers: 1,
      followings: 0,
    },
  },
  {
    id: 21,
    userId: 65,
    postId: 74,
    comment: 'hello',
    createdAt: '2023-09-19T07:26:18.138Z',
    user: {
      id: 65,
      email: 'linh@gmail.com',
      firstName: 'Linh',
      lastName: 'Nguyen',
      phone: '376734',
      gender: 'female',
      dob: '24/02/2001',
      displayName: 'linh123',
      picture: 'null',
      followers: 0,
      followings: 0,
    },
  },
  {
    id: 20,
    userId: 85,
    postId: 74,
    comment: 'kjbh',
    createdAt: '2023-09-19T05:05:00.559Z',
    user: {
      id: 85,
      email: 'ewqrkata@gmail.com',
      firstName: 'Thai',
      lastName: 'Le',
      phone: '111111111',
      gender: 'male',
      dob: '11/11/1111',
      displayName: 'thaiprovipno1server',
      picture: 'null',
      followers: 0,
      followings: 0,
    },
  },
  {
    id: 19,
    userId: 85,
    postId: 74,
    comment: '123456',
    createdAt: '2023-09-19T05:02:43.193Z',
    user: {
      id: 85,
      email: 'ewqrkata@gmail.com',
      firstName: 'Thai',
      lastName: 'Le',
      phone: '111111111',
      gender: 'male',
      dob: '11/11/1111',
      displayName: 'thaiprovipno1server',
      picture: 'null',
      followers: 0,
      followings: 0,
    },
  },
  {
    id: 17,
    userId: 65,
    postId: 74,
    comment: 'jkfjksdg.',
    createdAt: '2023-09-19T03:35:37.362Z',
    user: {
      id: 65,
      email: 'linh@gmail.com',
      firstName: 'Linh',
      lastName: 'Nguyen',
      phone: '376734',
      gender: 'female',
      dob: '24/02/2001',
      displayName: 'linh123',
      picture: 'null',
      followers: 0,
      followings: 0,
    },
  },
  {
    id: 14,
    userId: 65,
    postId: 74,
    comment: 'hahahahahaha',
    createdAt: '2023-09-19T03:04:07.243Z',
    user: {
      id: 65,
      email: 'linh@gmail.com',
      firstName: 'Linh',
      lastName: 'Nguyen',
      phone: '376734',
      gender: 'female',
      dob: '24/02/2001',
      displayName: 'linh123',
      picture: 'null',
      followers: 0,
      followings: 0,
    },
  },
];
const DetailPostComment = () => {
  const handleKeyDown = (e: any) => {
    e.target.style.height = 'inherit';
    const computed = window.getComputedStyle(e.target);

    const height =
      parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      e.target.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) +
      parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    e.target.style.height = `${height}px`;
  };
  return (
    <section className="section section-comment">
      <h2 className="comment-title">Comments {`(${listComment.length})`}</h2>
      <div className="comment-wrapper">
        <div className="comment-input-wrapper d-flex flex-column">
          <textarea placeholder="Add comment" className="comment-input" onChange={handleKeyDown} />
          <button className="btn btn-primary btn-comment">Comment</button>
        </div>
        <ul className="comment-list">
          {listComment.length &&
            listComment.map((commentItem) => {
              return (
                <li className="comment-item">
                  <CommentItem commentItem={commentItem} />
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default DetailPostComment;
