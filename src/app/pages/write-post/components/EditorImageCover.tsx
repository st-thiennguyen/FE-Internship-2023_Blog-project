import { RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import iconImage from '../../../../assets/icons/ic-image-25.svg';
import { fetchSignUrlImage } from '../image-sign.action';

interface EditorImageCoverProps {
  photoPreview: string | undefined;
  setPhotoPreview: (value: string) => void;
  setErrorCoverMessage: (value: string) => void;
}

const EditorImageCover = ({ photoPreview, setPhotoPreview, setErrorCoverMessage }: EditorImageCoverProps) => {
  const coverImageRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const clickSelectCover = () => {
    coverImageRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): boolean => {
    let isImageValid = true;
    const file = event.target.files![0]; // Get the first selected file

    if (file) {
      // Check if the file type isn't an image
      if (!file.type.startsWith('image/')) {
        setErrorCoverMessage('Please select a valid image file (jpg, png, etc.).');
        isImageValid = false;
      } else {
        // Check file size (in bytes)
        const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
        if (file.size > maxSizeInBytes) {
          setErrorCoverMessage('File size exceeds the maximum allowed (1MB).');
          isImageValid = false;
        } else {
          setErrorCoverMessage('');
          isImageValid = true;
        }
      }
    } else {
      setErrorCoverMessage('Image cover is required !');
      isImageValid = false;
    }
    return isImageValid;
  };

  const handleUploadCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleFileChange(e)) {
      const file = e.target.files![0];
      if (file) {
        dispatch(fetchSignUrlImage(file) as any);
        const previewUrl = URL.createObjectURL(file);
        setPhotoPreview(previewUrl);
      } else {
        setPhotoPreview('');
      }
    }
  };

  return (
    <div className="editor-cover">
      <div className="editor-cover-select d-flex justify-center item-center">
        {photoPreview ? (
          <div className="editor-cover-preview d-flex justify-center">
            <img src={photoPreview} alt="Cover image preview" />
          </div>
        ) : (
          <>
            <h5 className="editor-cover-title">Cover Image</h5>
            <div className="editor-cover-content d-flex flex-column item-center">
              <p className="editor-cover-txt">Select the cover image you would like to attach.</p>
              <button className="btn btn-add-cover" type="button" onClick={clickSelectCover}>
                <img src={iconImage} alt="Icon add image cover" width={30} height={30} />
              </button>
              <p className="editor-cover-subtxt">Image type</p>
            </div>
          </>
        )}
      </div>

      <input
        ref={coverImageRef}
        type="file"
        className="editor-cover-file"
        id="post-cover-file"
        accept="image/png, image/jpeg"
        onChange={handleUploadCover}
      />
    </div>
  );
};

export default EditorImageCover;
