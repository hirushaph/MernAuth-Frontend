import "./Button.css";

function Button({ children, type, disabled, onClick }) {
  return (
    <button disabled={disabled} onClick={onClick} className="btn" type={type}>
      {children}
    </button>
  );
}

export default Button;
