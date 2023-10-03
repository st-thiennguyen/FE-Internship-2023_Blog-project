import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigate,
  unstable_BlockerFunction as BlockerFunction,
  unstable_useBlocker as useBlocker,
} from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-quill/dist/quill.bubble.css';

import { RootState } from '../../../stores/store';
import { StorageKey } from '../../../shared/constants';
import { PostModel } from '../../../models/post';
import { getLocalStorage } from '../../../shared/utils';
import { createPost, resetWriteState, saveToDraft, updatePost } from '../write-post.action';

import EditorImageCover from './EditorImageCover';
import EditorPostTags from './EditorPostTags';
import TextEditor from './TextEditor';
import EditorPostVisibility from './EditorPostVisibility';
import EditorImageCoverPreview from './EditorImageCoverPreview';
import EditorPostActions from './EditorPostActions';
import ConfirmNavigation from './ConfirmNavigation';

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
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string[]>();
  const [photoPreview, setPhotoPreview] = useState<string>();
  const [file, setFile] = useState<File>();

  const [errorCoverMessage, setErrorCoverMessage] = useState('');
  const [errorContentMessage, setErrorContentMessage] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const isSuccess = useSelector((state: RootState) => state.writePost.isSuccess);
  const isError = useSelector((state: RootState) => state.writePost.isError);
  const currentPost = useSelector((state: RootState) => state.writePost.data);

  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN, '');
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<FormData>({ resolver: yupResolver(schema), defaultValues: { title: '', description: '' } });

  // Activate blocker when form is dirty & not on click button
  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => currentLocation.pathname !== nextLocation.pathname,
    [],
  );
  const blocker = useBlocker(!isUpdate && isFormDirty && !isClick && shouldBlock);

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  useEffect(() => {
    if (isFormDirty) {
      window.onbeforeunload = (e) => {
        e.preventDefault();
        e.returnValue = '';
      };
    }

    return () => {
      window.onbeforeunload = () => {};
      setIsClick(false);
      dispatch(resetWriteState());
    };
  }, [isFormDirty]);

  useEffect(() => {
    setValue('description', post?.description || '');
    setValue('title', post?.title || '');
    if (post?.content) {
      setContent(post.content);
    }
    if (post) {
      setTags(post.tags);
      setIsUpdate(true);
      setStatusPost(post.status);
    }
  }, [post]);

  // Check if user enter data to form
  useEffect(() => {
    if (isDirty || content || tags || file) {
      setIsFormDirty(true);
    } else setIsFormDirty(false);
  }, [isDirty, content, tags, file]);

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

  const handleUpdatePost = handleSubmit((data: FormData) => {
    setIsLoading(true);
    dispatch(updatePost({ ...data, content, status: statusPost, tags: tags }, post!.id, file) as any);
    setIsClick(true);
  });

  const handleUpdateDraft = () => {
    const data = getValues();
    setIsLoading(true);
    dispatch(updatePost({ ...data, content, status: statusPost, tags: tags }, post!.id, file) as any);
    setIsClick(true);
  };

  const handleUpdate = () => {
    if (statusPost === 'draft') {
      handleUpdateDraft();
    } else if (validate()) {
      handleUpdatePost();
    }
  };

  const handleCreatePost = handleSubmit(async (data: FormData) => {
    if (validate()) {
      setIsLoading(true);
      await dispatch(createPost({ ...data, content, status: statusPost, tags: tags }, file) as any);
      setIsClick(true);
    }
  });

  const onPublishPost = () => {
    validate();
    handleCreatePost();
  };

  const handleSaveDraft = async () => {
    if (isFormDirty) {
      const data = getValues();
      setIsLoading(true);
      await dispatch(
        saveToDraft(
          {
            ...data,
            content: content,
            status: 'draft',
          },
          file,
        ) as any,
      );
      setIsClick(true);
    }
  };

  if (isSuccess && isClick) {
    setIsLoading(false);
    navigate(`/posts/${currentPost.id}`);
    dispatch(resetWriteState());
  }

  return (
    <>
      <div className="section-body row">
        <div className="col col-9 col-xl-8 col-lg-12">
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
                rows={4}
                {...register('title')}
                className="editor-detail-input editor-detail-input-title"
                placeholder="Title of your story ..."
              />
              <p className="editor-detail-error">{errors.title?.message}</p>
              <textarea
                id="description-input-js"
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
        <aside className="aside aside-write-post d-flex flex-column  col col-3 col-xl-4 col-lg-12">
          <EditorPostVisibility onChangeValue={setStatusPost} currentStatus={statusPost} />
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
          <div className={isLoading || isError ? 'action-disabled' : 'action-wrapper'}>
            <EditorPostActions
              onPublish={!isUpdate ? onPublishPost : handleUpdate}
              onSaveDraft={handleSaveDraft}
              isUpdate={isUpdate}
            />
          </div>
        </aside>
      </div>
      {blocker && <ConfirmNavigation blocker={blocker} handleSaveDraft={handleSaveDraft} />}
    </>
  );
};

export default WritePost;
