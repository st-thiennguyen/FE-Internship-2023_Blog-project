import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const Recommend = () => {
  const data = [
    {
      id: 1,
      title: 'How to master ReactJs in one night?',
      content: 'this is content of post',
      tags: ['React'],
      status: 'public',
      userId: 1,
      likes: 1,
      comments: 1,
      cover: 1,
      recommend: true,
      user: {
        id: 55,
        email: 'viet@gmail.com',
        firstName: 'Nguyen',
        lastName: 'Viet',
        phone: '99999999',
      },
    },
    {
      id: 2,
      title: 'What is ReactJS',
      content: 'this is content of post',
      tags: ['React', 'Vue', 'Angular', 'NodeJs', 'Java'],
      status: 'public',
      userId: 2,
      likes: 2,
      comments: 2,
      cover: 2,
      recommend: true,
      user: {
        id: 55,
        email: 'thien@gmail.com',
        firstName: 'Nguyen',
        lastName: 'Thien',
        phone: '99999999',
      },
    },
    {
      id: 3,
      title: 'What is Redux, how does it work?',
      content: 'this is content of post',
      tags: ['React'],
      status: 'public',
      userId: 3,
      likes: 3,
      comments: 3,
      cover: 3,
      recommend: true,
      user: {
        id: 55,
        email: 'truong@gmail.com',
        firstName: 'Le',
        lastName: 'Truong',
        phone: '99999999',
      },
    },
    {
      id: 4,
      title: 'What is Redux, how does it work?',
      content: 'this is content of post',
      tags: ['React'],
      status: 'public',
      userId: 3,
      likes: 3,
      comments: 3,
      cover: 3,
      recommend: true,
      user: {
        id: 55,
        email: 'truong@gmail.com',
        firstName: 'Le',
        lastName: 'Truong',
        phone: '99999999',
      },
    },
    {
      id: 5,
      title: 'What is Redux, how does it work?',
      content: 'this is content of post',
      tags: ['React'],
      status: 'public',
      userId: 3,
      likes: 3,
      comments: 3,
      cover: 3,
      recommend: true,
      user: {
        id: 55,
        email: 'truong@gmail.com',
        firstName: 'Le',
        lastName: 'Truong',
        phone: '99999999',
      },
    },
  ];

  return (
    <section className="section section-recommend">
      <h2 className="section-title">RECOMMEND</h2>
      <Slider {...settings} className="recommend-list">
        {data.map((post) => {
          return (
            <Link to={'/'} className="recommend-link" key={post.id}>
              <div className="recommend-item">
                <div className="recommend d-flex flex-column">
                  <div className="recommend-content">
                    <h3 className="recommend-title">{post.title}</h3>
                    <span className="recommend-author">
                      By {post.user.lastName}
                    </span>
                    <div className="recommend-footer d-flex justify-between">
                      <ul className="recommend-reaction-list d-flex">
                        <li className="recommend-reaction-item d-flex">
                          <i className="icon icon-like"></i>
                          <span className="recommend-reaction-number">
                            {post.likes}
                          </span>
                        </li>
                        <li className="recommend-reaction-item d-flex">
                          <i className="icon icon-comment"></i>
                          <span className="recommend-reaction-number">
                            {post.comments}
                          </span>
                        </li>
                      </ul>
                      <ul className="tag-list d-flex">
                        {post.tags.map((tag) => {
                          return (
                            <li className="tag-item" key={tag}>
                              <span className="tag">{tag}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </section>
  );
};

export default Recommend;
