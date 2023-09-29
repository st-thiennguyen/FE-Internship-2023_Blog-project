import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-quill/dist/quill.bubble.css';

import EditorImageCover from './EditorImageCover';
import EditorPostTags from './EditorPostTags';
import TextEditor from './TextEditor';
import EditorPostVisibility from './EditorPostVisibility';
import EditorImageCoverPreview from './EditorImageCoverPreview';
import EditorPostActions from './EditorPostActions';

import { RootState } from '../../../stores/store';
import { createPost, updatePost } from '../write-post.action';
import { getLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';
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
  const [isClick, setIsClick] = useState(false);
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string[]>();
  const [photoPreview, setPhotoPreview] = useState<string>();
  const [file, setFile] = useState<File>();

  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSuccess = useSelector((state: RootState) => state.writePost.isSuccess);
  const currentPost = useSelector((state: RootState) => state.writePost.data);
  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN, '');

  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (post) {
      setTags(post.tags);
      setIsUpdate(true);
    }
  }, []);

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
    dispatch(updatePost({ ...data, content, status: statusPost, tags: tags }, post!.id, file) as any);
    setTimeout(() => {
      navigate(`/posts/${id}`);
    }, 3000);
    setIsClick(true);
  });

  const handleCreatePost = handleSubmit(async (data: any) => {
    if (validate()) {
      const { title, description } = data
      await dispatch(createPost({ ...data, content, status: statusPost, tags: tags }, file) as any);
    }
  });

  const onPublishPost = () => {
    validate();
    handleCreatePost();
    setIsClick(true);
  };

  // innit and dispose
  useEffect(() => {
    setValue('title', post?.title || '');
    setValue('description', post?.description || '');
    if (post?.content) {
      setContent(post.content);
    }
  }, [post]);

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  if (isSuccess && isClick) {
    setTimeout(() => {
      navigate(`/posts/${currentPost.id}`);
    }, 3000);
  }

  return (
    <>
      <div className="section-body row">
        <div className="col col-9">
          <form className="write-post-form d-flex flex-column" ref={formRef}>
            <EditorImageCover
              photoPreview={post?.cover || photoPreview}
              setPhotoPreview={setPhotoPreview}
              setErrorCoverMessage={setErrorCoverMessage}
              setFile={setFile}
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
                if (post?.cover) {
                  post!.cover = '';
                } else {
                  setPhotoPreview('');
                }
              }}
            />
          )}
          <EditorPostTags tags={tags || []} setTags={setTags} />
          <EditorPostActions
            onPublish={isUpdate ? handleUpdatePost : onPublishPost}
            onSaveDraft={() => alert('COMMING SOON')}
            isUpdate={isUpdate}
          />
        </aside>
      </div>
    </>
  );
};

export default WritePost;
