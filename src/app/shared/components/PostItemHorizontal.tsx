import React from 'react';
import { Link } from 'react-router-dom';
import imgDemo from '../../../assets/images/demo-cover.jpg';

const PostItemHorizontal = () => {
  return (
    <div className="post-item-hoz">
      <div className="post-item-hoz-wrapper">
        <Link to={'/'} className="post-item-hoz-link">
          <div className="post-item row">
            <div className="post-item-img col col-6">
              <img src={imgDemo} alt="Title off image" />
            </div>
            <div className="post-item-content col col-6">
              <p className="post-item-author">
                Nguyen Si Thien <span className="post-item-date">21-09-2001</span>
              </p>
              <h4 className="post-item-title d-flex justify-between">
                <p className="post-item-txt">Hoàng thái tử Nhật Bản tham quan Mỹ Sơn</p>
                <i className="icon icon-small icon-link-20"></i>
              </h4>
              <p className="post-item-desc">
                Tham quan khu đền tháp Mỹ Sơn, Hoàng thái tử Nhật Bản và Công nương bày tỏ quan tâm tới cụm di sản, quan
                sát chăm chú và dành nhiều câu hỏi cho hướng dẫn viên.
              </p>
              <ul className="post-item-react-list d-flex item-center">
                <li className="post-item-react-item d-flex item-center">
                  <i className="icon icon-small icon-fire-outline-20"></i>
                  <span className="post-item-react-count">20</span>
                </li>
                <li className="post-item-react-item d-flex item-center">
                  <i className="icon icon-small icon-comment-black"></i>
                  <span className="post-item-react-count">14</span>
                </li>
              </ul>
              <ul className="post-item-tags-list">
                <li className="post-item-tag-item"></li>
              </ul>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostItemHorizontal;
