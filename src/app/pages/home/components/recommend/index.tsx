import Slider from 'react-slick';

import RecommendItem from './RecommendItem';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
};

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

const Recommend = () => {
  return (
    <section className="section section-recommend">
      <Slider {...settings} className="recommend-list">
        {data.map((post) => {
          return <RecommendItem post={post} key={post.id} />;
        })}
      </Slider>
    </section>
  );
};

export default Recommend;
