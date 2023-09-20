import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import * as yup from 'yup';

import EditorImageCover from '../components/EditorImageCover';
import EditorPostTags from '../components/EditorPostTags';
import TextEditor from '../components/TextEditor';
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
  const [tags, setTags] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const descriptionInput = watch('description');
  const onDescChange = (value: string) => {
    setValue('description', value);
  };

  const contentInput = watch('content');
  const onContentChange = (value: string) => {
    setValue('content', value);
  };

  const onPublishPost = handleSubmit((data) => {});

  return (
    <>
      <WritePostHeader onPublishPost={onPublishPost} />
      <section className="section section-write-post">
        <div className="container">
          <div className="write-post">
            <form className="write-post-form d-flex flex-column">
              <input {...register('title')} className="write-post-input" type="text" placeholder="Title here ..." />
              <p className="write-post-form-error">{errors.title?.message}</p>
              <div className="write-post-editor">
                <EditorImageCover photoPreview={photoPreview} setPhotoPreview={setPhotoPreview} />
                <ReactQuill
                  className="write-post-area"
                  theme="bubble"
                  value={descriptionInput}
                  onChange={onDescChange}
                  placeholder="Description your story ..."
                />
                <p className="write-post-form-error">{errors.description?.message}</p>

                <TextEditor value={contentInput} placeholder={'Write your story ...'} onChange={onContentChange} />
                <p className="write-post-form-error">{errors.content?.message}</p>
              </div>
              <EditorPostTags tags={tags} setTags={setTags} />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default WritePost;
