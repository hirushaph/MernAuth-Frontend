import './Button.css';

function Button({ children, color, btnType, type, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn ${btnType} ${color}`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
