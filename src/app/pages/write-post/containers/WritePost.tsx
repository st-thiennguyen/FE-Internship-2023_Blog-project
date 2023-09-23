import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import EditorImageCover from '../components/EditorImageCover';
import EditorPostTags from '../components/EditorPostTags';
import TextEditor from '../components/TextEditor';
import WritePostHeader from '../components/WritePostHeader';
import { createPost } from '../write-post.action';
import ToastMessage from '../../../shared/components/ToastMessage';
import { RootState } from '../../../stores/store';
import 'react-quill/dist/quill.bubble.css';

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
      .min(50, 'Description must not be less than 100 characters')
      .max(300, 'Description must not be more than 300 characters!'),
    content: yup
      .string()
      .required('Content must not be null!')
      .min(50, 'Content must not be less than 200 characters!'),
  })
  .required();

type FormData = {
  title: string;
  description: string;
  content: string;
};

const WritePost = () => {

  const [statusPost, setStatusPost] = useState('public');
  const [tags, setTags] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>();
  const formRef: any = useRef(null);

  const linkImagePost = useSelector((state: any) => state.imageSign.data.url);
  const isSuccessCreatePost = useSelector((state: any) => state.writePost.isSuccess);
  const isErrorCreatePost = useSelector((state: any) => state.writePost.isError);
  const messageCreatePost = useSelector((state: any) => state.writePost.message);
  const idPost = useSelector((state: any) => state.writePost.data?.id);
  const accessToken: string = useSelector((state: RootState) => state.auth.auth?.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleReset = (data: any) => {
    formRef.current.reset();
    data.content = '';
    data.description = '';
    data.title = '';
    setPhotoPreview('');
    setTags([]);
  };

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

  const onPublishPost = handleSubmit((data: any) => {
    dispatch(createPost({ ...data, cover: linkImagePost, status: statusPost, tags: tags }) as any);
    handleReset(data);
  });

  const handleToggleStatus = (e: any) => {
    if (e.target.checked) {
      setStatusPost('private');
    } else {
      setStatusPost('public');
    }
  }

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  useEffect(() => {
    if (isSuccessCreatePost) {
      navigate(`/detail/${idPost}`);
    }
  }, [isSuccessCreatePost])

  return (
    <>
      <WritePostHeader onPublishPost={onPublishPost} />
      <section className="section section-write-post">
        <div className="container">
          <div className="write-post">
            <form className="write-post-form d-flex flex-column" ref={formRef}>
              <input {...register('title')} className="write-post-input" type="text" placeholder="Title here ..." />
              <p className="write-post-form-error">{errors.title?.message}</p>
              <div className="write-post-editor">
                <EditorImageCover photoPreview={photoPreview} setPhotoPreview={setPhotoPreview} />
                <div className="toggle-btn-status">
                  <div className="btn-status">
                    <div className="btn-toggle">
                      <input type="checkbox" className="checkbox" onClick={handleToggleStatus} />
                      <div className="private"></div>
                      <div className="public"></div>
                    </div>
                  </div>
                </div>
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
      {
        isSuccessCreatePost && <ToastMessage
          isShow={isSuccessCreatePost}
          isSuccess={isSuccessCreatePost}
          title='Success'
          subtitle={messageCreatePost}
        ></ToastMessage>
      }
      {
        isErrorCreatePost && <ToastMessage
          isShow={isErrorCreatePost}
          isSuccess={isErrorCreatePost}
          title='Error'
          subtitle={messageCreatePost}
        ></ToastMessage>
      }
    </>
  );
};

export default WritePost;
