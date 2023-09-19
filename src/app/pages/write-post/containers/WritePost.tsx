import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import * as yup from 'yup';

import iconImage from '../../../../assets/icons/ic-image-25.svg';
import iconImageLocal from '../../../../assets/icons/ic-image-computer.svg';
import iconImageNetwork from '../../../../assets/icons/ic-image-network.svg';
import WritePostHeader from '../components/WritePostHeader';

const schema = yup
  .object({
    title: yup
      .string()
      .required('Title must not be null!')
      .min(20, 'Title must not be less than 20 characters')
      .max(200, 'Title must not be more than 200 characters!'),
    description: yup
      .string()
      .required('Description must not be null!')
      .min(100, 'Description must not be less than 100 characters')
      .max(300, 'Description must not be more than 300 characters!'),
    content: yup
      .string()
      .required('Content must not be null!')
      .min(200, 'Content must not be less than 200 characters!'),
  })
  .required();

type FormData = {
  title: string;
  description: string;
  content: string;
};

const WritePost = () => {
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [isOpenInputLink, setIsOpenInputLink] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>();
  const tagRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const coverLinkRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && tagRef.current!.value !== '') {
      setTags([...tags, tagRef.current!.value.trim()]);
      tagRef.current!.value = '';
    }
  };

  const handleRemoveTag = (id: number) => {
    const newTags = tags.filter((item, index) => index !== id);
    setTags([...newTags]);
  };

  const descriptionInput = watch('description');
  const onDescChange = (value: string) => {
    setValue('description', value);
  };

  const contentInput = watch('content');
  const onContentChange = (value: string) => {
    setValue('content', value);
  };

  const clickSelectCover = () => {
    coverImageRef.current?.click();
  };

  const clickEnterLinkCover = () => {
    setIsOpenInputLink(!isOpenInputLink);
  };

  const handleUploadCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    } else {
      setPhotoPreview('');
    }
  };

  const handleLinkCover = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      setPhotoPreview(coverLinkRef.current!.value);
      coverLinkRef.current!.value = '';
    }
  };

  const onPublishPost = handleSubmit((data) => {});

  return (
    <>
      <WritePostHeader onPublishPost={onPublishPost} />
      <div className="write-post">
        <div className="container">
          <div className="write-post-wrapper">
            <form className="write-post-form d-flex flex-column">
              <input
                {...register('title')}
                className="write-post-input"
                type="text"
                placeholder="Title post here ..."
              />
              <p className="write-post-form-error">{errors.title?.message}</p>
              <div className="write-post-editor">
                <button className="btn btn-add-cover" type="button" onClick={() => setIsOpenImage(!isOpenImage)}>
                  <img src={iconImage} alt="Icon add image cover" width={18} height={18} />
                </button>

                <input
                  ref={coverImageRef}
                  type="file"
                  className="post-cover-file"
                  id="post-cover-file"
                  onChange={handleUploadCover}
                  accept="image/png, image/jpeg"
                />

                {isOpenInputLink && (
                  <input
                    ref={coverLinkRef}
                    onKeyDown={handleLinkCover}
                    type="text"
                    className="post-cover-link"
                    placeholder="Enter the cover link here ..."
                  />
                )}

                {isOpenImage && (
                  <div className="write-post-path-cover d-flex">
                    <button className="btn btn-pick-cover" type="button" onClick={clickSelectCover}>
                      <img src={iconImageLocal} alt="Icon add image cover" width={16} height={16} />
                    </button>
                    <button className="btn btn-pick-cover" type="button" onClick={clickEnterLinkCover}>
                      <img src={iconImageNetwork} alt="Icon add image cover" width={16} height={16} />
                    </button>
                  </div>
                )}

                {photoPreview && <img src={photoPreview} alt="Image of preview of title" />}

                <ReactQuill
                  className="write-post-area"
                  theme="bubble"
                  value={descriptionInput}
                  onChange={onDescChange}
                  placeholder="Description your story ..."
                />
                <p className="write-post-form-error">{errors.description?.message}</p>

                <ReactQuill
                  className="write-post-area"
                  theme="bubble"
                  value={contentInput}
                  onChange={onContentChange}
                  placeholder="Write your story ..."
                />
                <p className="write-post-form-error">{errors.content?.message}</p>
              </div>
              <div className="write-post-tags">
                <input
                  ref={tagRef}
                  className="write-post-input-tags"
                  type="text"
                  onKeyDown={handleAddTag}
                  placeholder="Enter your tags ..."
                />
                <span className="tags-hint">Hit 'Enter' to add new tag</span>
                <ul className="post-tags-list d-flex flex-wrap">
                  {tags &&
                    tags.map((e, index) => {
                      return (
                        <li className="post-tag-item" key={index}>
                          <span className="tag tag-write-post" onClick={() => handleRemoveTag(index)}>
                            #{e}{' '}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WritePost;
