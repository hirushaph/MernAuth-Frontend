import "./Button.css";

function Button({ children, type }) {
  return (
    <button className="btn" type={type}>
      {children}
    </button>
  );
}

export default Button;
