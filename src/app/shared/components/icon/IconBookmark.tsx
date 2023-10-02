import { IconProps } from '../../../models/icon';

const IconBookmark = ({ color }: IconProps) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" fill="none" stroke="currentColor">
      <path
        fill={color || ''}
        stroke={color || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      ></path>
    </svg>
  );
};

export default IconBookmark;
