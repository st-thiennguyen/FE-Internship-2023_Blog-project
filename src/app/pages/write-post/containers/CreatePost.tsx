import WritePost from "../components/PostForm";

const CreatePost = () => {
  return (
    <>
      <section className="section section-write-post">
        <div className="container">
          <h2 className="section-title text-primary section-title-editor">What's for today ? </h2>
          <WritePost />
        </div>
      </section>
    </>
  );
}
export default CreatePost;
