import "./Button.css";

function Button({ children, btnType, type, disabled, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn ${btnType}`}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
