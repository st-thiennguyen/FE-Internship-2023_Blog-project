import Button from '../../../shared/components/Button';

interface EditorPostActionsProps {
  isUpdate: boolean;
  onPublish: () => void;
  onSaveDraft: () => void;
}

const EditorPostActions = ({ isUpdate, onPublish, onSaveDraft }: EditorPostActionsProps) => {
  return (
    <div className="editor-actions">
      <h5 className="editor-actions-title">Actions</h5>
      <div className="editor-actions-content d-flex ">
        {!isUpdate && (
          <button className="btn btn-secondary btn-rounded btn-editor-actions" onClick={onSaveDraft}>
            Save Draft
          </button>
        )}
        <button className="btn btn-primary btn-rounded btn-editor-actions" onClick={onPublish}>
          {isUpdate ? 'Update' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default EditorPostActions;
