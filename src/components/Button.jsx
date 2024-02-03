import "./Button.css";

function Button({ children, type, disabled }) {
  return (
    <button disabled={disabled} className="btn" type={type}>
      {children}
    </button>
  );
}

export default Button;
