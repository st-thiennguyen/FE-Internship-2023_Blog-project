import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-quill/dist/quill.bubble.css';

import ToastMessage from '../../../shared/components/ToastMessage';
import EditorImageCover from '../components/EditorImageCover';
import EditorPostTags from '../components/EditorPostTags';
import TextEditor from '../components/TextEditor';
import { RootState } from '../../../stores/store';
import { createPost, updatePost } from '../write-post.action';
import EditorPostVisibility from '../components/EditorPostVisibility';
import EditorImageCoverPreview from '../components/EditorImageCoverPreview';
import EditorPostActions from '../components/EditorPostActions';
import { PostModel } from '../../../models/post';

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
  })
  .required();

type FormData = {
  title: string;
  description: string;
};

interface WritePostProps {
  post?: PostModel;
}

const WritePost = ({ post }: WritePostProps) => {
  const [statusPost, setStatusPost] = useState('public');
  const [errorCoverMessage, setErrorCoverMessage] = useState('');
  const [errorContentMessage, setErrorContentMessage] = useState('');
  const [content, setContent] = useState<string>('');
  const [isShowToast, setIsShowToast] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  const cover = useSelector((state: RootState) => state.imageSign.data.url);
  const isSuccess = useSelector((state: RootState) => state.writePost.isSuccess);
  const isError = useSelector((state: RootState) => state.writePost.isError);
  const message = useSelector((state: RootState) => state.writePost.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken: string = useSelector((state: RootState) => state.auth.auth?.accessToken);

  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (post) {
      setIsUpdate(true);
    }
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const validate = (): boolean => {
    let isValid = true;
    if (!photoPreview) {
      setErrorCoverMessage('Image cover is required !');
      isValid = false;
    }
    if (!content) {
      setErrorContentMessage('Content must not be null !');
      isValid = false;
    }
    if (errorContentMessage || errorCoverMessage) {
      isValid = false;
    }
    return isValid;
  };

  const handleUpdatePost = handleSubmit((data: any) => {
    if (validate()) {
      dispatch(
        updatePost({ ...data, content: content, status: statusPost, tags: tags, cover: cover }, post!.id) as any,
      );
      setIsShowToast(true);
      setTimeout(() => {
        navigate(`/posts/${id}`);
      }, 3000);
    }
  });

  const handleCreatePost = handleSubmit(async (data: any) => {
    if (validate()) {
      await dispatch(createPost({ ...data, content: content, cover: cover, status: statusPost, tags: tags }) as any);
      setIsShowToast(true);
    }
  });

  const onPublishPost = () => {
    validate();
    handleCreatePost();
  };

  // innit and dispose
  useEffect(() => {
    setValue('description', post?.description || '');
    setValue('title', post?.title || '');
    if (post?.content) {
      setContent(post.content);
    }
  }, [post]);

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
  }, [accessToken]);

  if (isSuccess && isShowToast) {
    setTimeout(() => {
      navigate(`/posts/${id}`);
    }, 3000);
  }

  return (
    <>
      <section className="section section-write-post">
        <div className="container">
          <h2 className="section-title text-primary section-title-editor">What's for today ? </h2>
          <div className="section-body row">
            <div className="col col-9">
              <form className="write-post-form d-flex flex-column" ref={formRef}>
                <EditorImageCover
                  photoPreview={post?.cover || photoPreview}
                  setPhotoPreview={setPhotoPreview}
                  setErrorCoverMessage={setErrorCoverMessage}
                />
                <p className="editor-detail-error">{errorCoverMessage}</p>
                <div className="editor-detail">
                  <h5 className="editor-detail-title">Post detail</h5>
                  <textarea
                    rows={1}
                    {...register('title')}
                    className="editor-detail-input"
                    placeholder="Title of your story ..."
                  />
                  <p className="editor-detail-error">{errors.title?.message}</p>
                  <textarea
                    rows={1}
                    {...register('description')}
                    className="editor-detail-input"
                    placeholder="Description of your story ..."
                  />
                  <p className="editor-detail-error">{errors.description?.message}</p>

                  <div className="editor-detail-area">
                    <TextEditor
                      value={content}
                      placeholder={'Write your story ...'}
                      setError={setErrorContentMessage}
                      setContent={setContent}
                    />
                    <p className="editor-detail-error">{errorContentMessage}</p>
                  </div>
                </div>
              </form>
            </div>
            <aside className="aside aside-write-post d-flex flex-column  col col-3">
              <EditorPostVisibility onChangeValue={setStatusPost} currentStatus={post?.status} />
              {photoPreview && (
                <EditorImageCoverPreview
                  photoPreview={photoPreview}
                  onRemovePreview={() => {
                    post!.cover = '';
                    setPhotoPreview('');
                  }}
                />
              )}
              <EditorPostTags
                tags={tags || post?.tags}
                setTags={setTags}
              />
              <EditorPostActions
                onPublish={isUpdate ? handleUpdatePost : onPublishPost}
                onSaveDraft={() => alert('COMMING SOON')}
                isUpdate={isUpdate}
              />
            </aside>
          </div>
        </div>
      </section>
      {isShowToast && isSuccess && (
        <ToastMessage
          isSuccess={isSuccess}
          isShow={isSuccess}
          title="Success"
          subtitle="Redirecting to detail post..."
        />
      )}
      {isShowToast && isError && <ToastMessage isSuccess={isError} isShow={isError} title="Error" subtitle={message} />}
    </>
  );
};

export default WritePost;
