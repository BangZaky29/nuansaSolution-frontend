const InputField = ({ label, value, onChange, readOnly = false, type = 'text' }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        readOnly={readOnly}
        className="form-input"
      />
    </div>
  );
};

export default InputField;