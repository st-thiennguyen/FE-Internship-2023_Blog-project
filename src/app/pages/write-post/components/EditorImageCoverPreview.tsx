interface EditorImageCoverPreviewProps {
  photoPreview: string;
  onRemovePreview: () => void;
}

const EditorImageCoverPreview = ({ photoPreview, onRemovePreview }: EditorImageCoverPreviewProps) => {
  return (
    <div className="editor-cover-preview">
      <h5 className="editor-cover-preview-title">Cover Preview</h5>
      <div className="editor-cover-preview-img">
        <img src={photoPreview} alt="Preview of image cover post" />
      </div>
      <div className="d-flex justify-end" onClick={onRemovePreview}>
        <button type="button" className="btn btn-secondary btn-remove-preview">
          Remove Cover
        </button>
      </div>
    </div>
  );
};

export default EditorImageCoverPreview;
