interface ButtonProps {
  handleClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  label: string;
  optionClassName?: string;
}

const Button = ({ handleClick, isLoading, isDisabled, label, optionClassName }: ButtonProps) => {
  return (
    <button className={`btn ${optionClassName}`} onClick={handleClick} disabled={isDisabled || isLoading}>
      <span className="btn-label">{label}</span>
      <p className={`${isLoading && `btn-loading`}`}></p>
    </button>
  );
};

export default Button;
