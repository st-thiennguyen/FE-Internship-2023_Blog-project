import { Link } from 'react-router-dom';

const PostItem = () => {
  return (
    <Link to={'/'}>
      <li className="post-item">
        <div className="post">
          <img
            src={require('../../../assets/images/demo-cover.jpg')}
            alt="Post Title"
            className="post-img"
          />
          <div className="post-body-wrapper">
            <div className="post-body">
              <span className="post-author">Nguyen Trong Viet</span>
              <h3 className="post-title">Title Of Post</h3>
              <p className="post-content">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repellat odio quasi saepe omnis iusto consequatur vitae illo
                quisquam porro distinctio animi quaerat ab officiis suscipit
                sit, aliquam quas nesciunt rem?
              </p>
            </div>
            <div className="post-footer d-flex justify-between">
              <span className="read-more">READ MORE</span>
              <ul className="post-reaction-list d-flex item-center">
                <div className="post-reaction-item d-flex">
                  <i className="icon icon-small icon-like-black"></i>
                  <span className="post-reaction-number">10</span>
                </div>
                <div className="post-reaction-item d-flex">
                  <i className="icon icon-small icon-comment-black"></i>
                  <span className="post-reaction-number">10</span>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default PostItem;
