import { useEffect, useState } from 'react';

interface EditorPostVisibilityProps {
  onChangeValue: (value: string) => void;
  currentStatus?: string ;
}

const EditorPostVisibility = ({ onChangeValue, currentStatus }: EditorPostVisibilityProps) => {
  const [status, setStatus] = useState(currentStatus || 'public');
  useEffect(() => {
    if (status) {
      onChangeValue(status);
    }
  }, [status]);
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
              onChange={(e) => setStatus(e.target.value)}
              checked={currentStatus === 'public'}
              value="public"
            />
            <span>
              Public <span className="icon">📢</span>{' '}
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
              onChange={(e) => setStatus(e.target.value)}
            />
            <span>
              Private <span className="icon">🔏</span>{' '}
            </span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default EditorPostVisibility;
