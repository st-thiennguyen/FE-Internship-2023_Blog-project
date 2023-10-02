import { useEffect, useRef } from 'react';

import iconImage from '../../../../assets/icons/ic-image-25.svg';

interface EditorImageCoverProps {
  photoPreview: string | undefined;
  setPhotoPreview: (value: string) => void;
  isUpdate?: boolean;
  setErrorCoverMessage: (value: string) => void;
  setFile: (file: any) => void;
}

const EditorImageCover = ({
  photoPreview,
  setPhotoPreview,
  setErrorCoverMessage,
  isUpdate,
  setFile,
}: EditorImageCoverProps) => {
  const coverImageRef = useRef<HTMLInputElement>(null);
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
        const previewUrl = URL.createObjectURL(file);
        setPhotoPreview(previewUrl);
        setFile(file);
      } else {
        setPhotoPreview('');
      }
    }
  };

  useEffect(() => {
    if (photoPreview !== '') {
      setPhotoPreview(photoPreview as string);
    } else {
      coverImageRef.current!.value = '';
    }
  }, [photoPreview]);

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
              <p className="editor-cover-txt text-center">Select the cover image you would like to attach.</p>
              <button className="btn btn-add-cover" type="button" onClick={clickSelectCover} disabled={isUpdate}>
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
