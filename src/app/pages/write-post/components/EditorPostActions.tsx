import Button from '../../../shared/components/Button';

interface EditorPostActionsProps {
  isUpdate: boolean;
  isLoading?: boolean;
  onPublish: () => void;
  onSaveDraft: () => void;
}

const EditorPostActions = ({ isUpdate, isLoading, onPublish, onSaveDraft }: EditorPostActionsProps) => {
  return (
    <div className="editor-actions">
      <h5 className="editor-actions-title">Actions</h5>
      <div className="editor-actions-content d-flex ">
        {!isUpdate && (
          <Button
            label={'Save Draft'}
            optionClassName="btn btn-secondary btn-rounded btn-editor-actions"
            handleClick={onSaveDraft}
            isDisabled={isLoading}
          />
        )}
        <Button
          label={isUpdate ? 'Update' : 'Publish'}
          optionClassName="btn btn-primary btn-rounded btn-editor-actions"
          handleClick={onPublish}
          isDisabled={isLoading}
        />
      </div>
    </div>
  );
};

export default EditorPostActions;
