import { useEffect } from 'react';

interface EditorPostVisibilityProps {
  onChangeValue: (value: string) => void;
  currentStatus?: string;
}

const EditorPostVisibility = ({ onChangeValue, currentStatus }: EditorPostVisibilityProps) => {
  useEffect(() => {
    onChangeValue(currentStatus!);
  }, [currentStatus]);

  return (
    <div className="editor-visibility">
      <h5 className="editor-visibility-title">Visibility</h5>
      <ul className="editor-visibility-list">
        <li className="editor-visibility-item">
          <label className="d-flex item-center" htmlFor="public">
            <input
              type="radio"
              id="public"
              name="visibility"
              onChange={(e) => onChangeValue(e.target.value)}
              checked={currentStatus === 'public'}
              value="public"
            />
            <span>
              Public <i className="icon icon-public icon-small" />
            </span>
          </label>
        </li>
        <li className="editor-visibility-item">
          <label className="d-flex item-center" htmlFor="private">
            <input
              type="radio"
              id="private"
              name="visibility"
              value="private"
              checked={currentStatus === 'private'}
              onChange={(e) => onChangeValue(e.target.value)}
            />
            <span>
              Private <i className="icon icon-private icon-small" />
            </span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default EditorPostVisibility;
