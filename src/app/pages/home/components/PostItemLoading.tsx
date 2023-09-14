const PostItemLoading = () => {
  return (
    <li className="skeleton post-item">
      <div className="skeleton post">
        <div className="post-img-wrapper">
          <img className="skeleton post-img" alt="Post Image Loading" />
        </div>
        <div className="post-body-wrapper skeleton">
          <div className="post-body">
            <div className="post-body-top d-flex item-center">
              <div className="user-info-wrapper d-flex item-center">
                <img className="user-avatar" />
                <span className="user-name"></span>
              </div>
              <p className="post-created-date"></p>
            </div>
            <h3 className="post-title"></h3>
            <p className="post-content"></p>
          </div>
          <div className="post-footer d-flex justify-between">
            <span className="read-more">READ MORE</span>
            <ul className="post-reaction-list d-flex item-center">
              <div className="post-reaction-item d-flex">
                <i className="icon icon-small icon-like-black"></i>
                <span className="post-reaction-number"></span>
              </div>
              <div className="post-reaction-item d-flex">
                <i className="icon icon-small icon-comment-black"></i>
                <span className="post-reaction-number"></span>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostItemLoading;
