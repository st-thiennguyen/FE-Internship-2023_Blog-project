interface ButtonProps {
  handleClick?: () => void,
  isLoading?: boolean,
  label: string,
  optionClassName?: string
}

const Button = ({ handleClick, isLoading, label, optionClassName }: ButtonProps) => {
  return (
    <button className={`btn ${optionClassName}`} onClick={handleClick}>
      { label }
      <p className = { isLoading? "btn-loading": "" } ></p>
    </button >
  );
};

export default Button;
