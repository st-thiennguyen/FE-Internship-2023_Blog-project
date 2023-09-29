const PostItemLoading = () => {
  return (
    <div className="post d-flex">
      <div className="post-content-wrapper d-flex flex-column justify-between skeleton-text">
        <div className="post-content-body d-flex justify-between flex-column">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text skeleton-mb-5"></div>
          <div className="skeleton skeleton-text skeleton-mb-5"></div>
          <div className="post-info d-flex item-center">
            <div className="post-author d-flex item-center skeleton-text">
              <div className="skeleton skeleton-avatar"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="post-img-wrapper">
        <div className="post-link skeleton">
          <div className="post-cover"></div>
        </div>
      </div>
    </div>
  );
};

export default PostItemLoading;
