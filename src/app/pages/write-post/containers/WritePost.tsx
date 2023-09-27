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
import EditorPostVisibility from '../components/EditorPostVisibility';
import EditorImageCoverPreview from '../components/EditorImageCoverPreview';
import EditorPostActions from '../components/EditorPostActions';

import { RootState } from '../../../stores/store';
import { createPost, resetWriteState, updatePost } from '../write-post.action';
import { fetchDetailBlog } from '../../detail-post/detail-post.actions';
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
  isUpdate: boolean;
}

const WritePost = ({ isUpdate }: WritePostProps) => {
  const [statusPost, setStatusPost] = useState('public');
  const [errorCoverMessage, setErrorCoverMessage] = useState('');
  const [errorContentMessage, setErrorContentMessage] = useState('');
  const [content, setContent] = useState<string>('');
  const [isShowToast, setIsShowToast] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>();
  
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cover = useSelector((state: RootState) => state.imageSign.data.url);
  const isSuccess = useSelector((state: RootState) => state.writePost.isSuccess);
  const isError = useSelector((state: RootState) => state.writePost.isError);
  const message = useSelector((state: RootState) => state.writePost.message);


  const detailPost: any = useSelector((state: RootState) => state.detail.data || {});
  const isLogin  = getLocalStorage(StorageKey.ACCESS_TOKEN, '');

  const post: PostModel = useSelector((state: RootState) => state.writePost.data);

  const { id } = useParams();

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
        updatePost({ ...data, content: content, status: statusPost, tags: tags, cover: cover }, detailPost.id) as any,
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

  useEffect(() => {
    setValue('description', detailPost?.description || '');
    setValue('title', detailPost?.title || '');
    if (detailPost.content && isUpdate) {
      setContent(detailPost.content);
    }
  }, [detailPost]);

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  if (isSuccess && isShowToast) {
    setTimeout(() => {
      navigate(`/posts/${post.id}`);
    }, 3000);
  }

  // init and dispose
  useEffect(() => {
    isUpdate && dispatch(fetchDetailBlog(Number(id)) as any);
    return () => dispatch(resetWriteState() as any);
  }, []);

  return (
    <>
      <section className="section section-write-post">
        <div className="container">
          <h2 className="section-title text-primary section-title-editor">What's for today ? </h2>
          <div className="section-body row">
            <div className="col col-9">
              <form className="write-post-form d-flex flex-column" ref={formRef}>
                <EditorImageCover
                  photoPreview={photoPreview || detailPost?.cover}
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
              <EditorPostVisibility onChangeValue={setStatusPost} currentStatus={detailPost?.status} />
              {photoPreview && (
                <EditorImageCoverPreview
                  photoPreview={photoPreview}
                  onRemovePreview={() => {
                    detailPost.cover = '';
                    setPhotoPreview('');
                  }}
                />
              )}
              <EditorPostTags
                tags={tags.length ? tags : detailPost?.tags || []}
                setTags={setTags}
                isUpdate={isUpdate}
              />
              <EditorPostActions
                onPublish={!isUpdate ? onPublishPost : handleUpdatePost}
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
