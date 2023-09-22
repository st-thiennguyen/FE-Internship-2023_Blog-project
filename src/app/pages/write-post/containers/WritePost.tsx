import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import EditorImageCover from '../components/EditorImageCover';
import EditorPostTags from '../components/EditorPostTags';
import TextEditor from '../components/TextEditor';
import WritePostHeader from '../components/WritePostHeader';
import { createPost, updatePost } from '../write-post.action';
import ToastMessage from '../../../shared/components/ToastMessage';
import { RootState } from '../../../stores/store';
import 'react-quill/dist/quill.bubble.css';
import { fetchDetailBlog } from '../../detail-post/detail-post.actions';

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

interface writePostProps {
  isUpdate: boolean
}

const WritePost = ({ isUpdate }: writePostProps) => {

  const [tags, setTags] = useState<string[]>([]);
  const [statusPost, setStatusPost] = useState('public');
  const [photoPreview, setPhotoPreview] = useState<string>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef: any = useRef(null);

  const linkImagePost = useSelector((state: any) => state.imageSign.data.url);
  const detailPost = useSelector((state: RootState) => state.detail.data);
  const imagePostUpdate = useSelector((state: any) => state.writePost.data?.cover);
  const isSuccessCreatePost = useSelector((state: any) => state.writePost.isSuccess);
  const isErrorUpdatePost = useSelector((state: any) => state.writePost.isError);
  const isMessageCreatePost = useSelector((state: any) => state.writePost.message);
  const accessToken: string = useSelector((state: RootState) => state.auth.auth?.accessToken);


  const { id } = useParams();

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

  const handleUpdatePost = handleSubmit((data: any) => {
    dispatch(updatePost(data, detailPost.id) as any)
    setTimeout(()=>{
      navigate(`/detail/${id}`)
    },1500)
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
    dispatch(fetchDetailBlog(Number(id)) as any);
  }, [])

  useEffect(() => {
    if (detailPost.description && isUpdate) {
      setValue('description', detailPost.description);
    }
  }, [detailPost.description])

  useEffect(() => {
    if (detailPost.content && isUpdate) {
      setValue('content', detailPost.content);
    }
  }, [detailPost.content])

  return (
    <>
      {
        isUpdate ? (<>
          <WritePostHeader isUpdate={isUpdate} handleUpdatePost={handleUpdatePost} />
          <section className="section section-write-post">
            <div className="container">
              <div className="write-post">
                <form className="write-post-form d-flex flex-column" ref={formRef}>
                  <input {...register('title')} className="write-post-input" type="text" placeholder="Title here ..."
                    defaultValue={detailPost.title && detailPost.title}
                  />
                  <p className="write-post-form-error">{errors.title?.message}</p>
                  <div className="write-post-editor">
                    <EditorImageCover photoPreview={imagePostUpdate} setPhotoPreview={setPhotoPreview} isUpdate={isUpdate} />
                    <div className="toggle-btn-status">
                      <div className="btn-status">
                        <div className="btn-toggle">
                          <input type="checkbox" className="checkbox" onClick={handleToggleStatus} />
                          <div className="knobs"></div>
                          <div className="layer"></div>
                        </div>
                      </div>
                    </div>
                    <ReactQuill
                      className="write-post-area"
                      theme="bubble"
                      value={descriptionInput}
                      onChange={onDescChange}
                      placeholder="Description your story ..."
                      readOnly={true}
                    />
                    <p className="write-post-form-error">{errors.description?.message}</p>
                    <TextEditor value={contentInput} placeholder={'Write your story ...'} onChange={onContentChange} />
                    <p className="write-post-form-error">{errors.content?.message}</p>
                  </div>
                  <EditorPostTags tags={detailPost.tags ? detailPost.tags : tags} setTags={setTags} isUpdate={isUpdate} />
                </form>
              </div>
            </div>
          </section>
          <ToastMessage
            isSuccess={isSuccessCreatePost}
            isShow={isSuccessCreatePost}
            title='success'
            subtitle={isMessageCreatePost}
          ></ToastMessage>
          <ToastMessage
            isSuccess={!isErrorUpdatePost}
            isShow={isErrorUpdatePost}
            title='error'
            subtitle={isMessageCreatePost}
          ></ToastMessage>
        </>) : (
          <>
            <WritePostHeader onPublishPost={onPublishPost} />
            <section className="section section-write-post">
              <div className="container">
                <div className="write-post">
                  <form className="write-post-form d-flex flex-column" ref={formRef}>
                    <input {...register('title')} className="write-post-input" type="text" placeholder="Title here ..."
                    />
                    <p className="write-post-form-error">{errors.title?.message}</p>
                    <div className="write-post-editor">
                      <EditorImageCover photoPreview={photoPreview} setPhotoPreview={setPhotoPreview} />
                      <div className="toggle-btn-status">
                        <div className="btn-status">
                          <div className="btn-toggle">
                            <input type="checkbox" className="checkbox" onClick={handleToggleStatus} />
                            <div className="knobs"></div>
                            <div className="layer"></div>
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
            <ToastMessage
              isSuccess={isSuccessCreatePost}
              isShow={isSuccessCreatePost}
              title={isSuccessCreatePost ? 'success' : 'error'}
              subtitle={isMessageCreatePost}
            ></ToastMessage>
          </>
        )
      }
    </>
  );
};

export default WritePost;
