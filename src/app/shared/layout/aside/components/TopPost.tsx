import { Link } from 'react-router-dom';

const TopPost = () => {
  return (
    <div className="top-post">
      <h3 className="aside-title">Top Post</h3>
      <ul className="top-post-list">
        <Link className="top-post-link" to={'/'}>
          <li className="top-post-item">
            <span className="top-post-author">Nguyen Trong Viet</span>
            <h4 className="top-post-title">
              The Ultimate Guide to Starting a Business
            </h4>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default TopPost;
