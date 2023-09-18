import React, { FormEvent, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import iconImage from '../../../../assets/icons/ic-image-25.svg';
import iconImageLocal from '../../../../assets/icons/ic-image-computer.svg';
import iconImageNetwork from '../../../../assets/icons/ic-image-network.svg';
import Header from '../../../shared/layout/Header';

const WritePost = () => {
  const [isOpenImage, setIsOpenImage] = useState(false);

  const [value, setValue] = useState('');

  const onPublishPost = (event: FormEvent) => {
    event.preventDefault();
    alert(value);
  };
  return (
    <div className="write-post">
      <div className="container">
        <div className="write-post-wrapper">
          <form className="write-post-form" onSubmit={onPublishPost}>
            <input className="write-post-input" type="text" placeholder="Title post here ..." />
            <div className="write-post-editor">
              <button className="btn btn-add-cover" type="button" onClick={() => setIsOpenImage(!isOpenImage)}>
                <img src={iconImage} alt="Icon add image cover" width={18} height={18} />
              </button>
              {isOpenImage && (
                <div className="write-post-path-cover d-flex">
                  <button className="btn btn-pick-cover">
                    <img src={iconImageLocal} alt="Icon add image cover" width={16} height={16} />
                  </button>
                  <button className="btn btn-pick-cover">
                    <img src={iconImageNetwork} alt="Icon add image cover" width={16} height={16} />
                  </button>
                </div>
              )}
              <ReactQuill
                className="write-post-area"
                theme="bubble"
                value={value}
                onChange={setValue}
                placeholder="Write your story ..."
              />
            </div>
            <button className="btn btn-primary btn-publish-post">Publish</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
