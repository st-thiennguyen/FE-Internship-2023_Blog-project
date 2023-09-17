const PostItemLoading = () => {
  return (
    <div className="post">
      <div className="skeleton-loader post-img" />
      <div className="post-body-wrapper">
        <div className="post-body-top">
          <div className="user-info-wrapper d-flex item-center">
            <div className="skeleton-loader skeleton-avatar"></div>
            <div className="skeleton-loader skeleton-sub-text"></div>
          </div>
        </div>
        <div className="skeleton-loader skeleton-title"></div>

        <div className="skeleton-loader skeleton-text"></div>
        <div className="skeleton-loader skeleton-text"></div>

        <div className="post-footer">
          <div className="skeleton-loader skeleton-text"></div>
        </div>
      </div>
    </div>
  );
};

export default PostItemLoading;
