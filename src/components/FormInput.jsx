import "./FormInput.css";

function FormInput({
  type,
  placeholder,
  value,
  onChange,
  name,
  errors,
  label,
  maxLength,
}) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="input"
        maxLength={maxLength}
      />
      {errors?.[name] && <span className="errorMessage">{errors[name]}</span>}
    </div>
  );
}

export default FormInput;
