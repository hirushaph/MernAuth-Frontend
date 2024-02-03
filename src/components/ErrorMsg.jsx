import "./ErrorMsg.css";

function ErrorMsg({ error }) {
  return (
    <div className="form-error">
      {!Array.isArray(error) && <p>{error}</p>}

      {Array.isArray(error) &&
        error.map((err, index) => <p key={index}>{err}</p>)}
    </div>
  );
}

export default ErrorMsg;
