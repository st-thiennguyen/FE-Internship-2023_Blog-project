const EmptyPost = () => {
  return (
    <div className="empty-post d-flex item-center flex-column">
      <img src={require('../../../../../assets/images/no-post.jpg')} alt="No post found" className="empty-post-img" />
      <h2 className="empty-post-title">Not Found Articles</h2>
      <p className="empty-post-desc">We're sorry, please refresh page !!</p>
    </div>
  );
};

export default EmptyPost;