const SelectMethod = ({ value, onChange, disabled = false }) => {
  return (
    <div className="form-group">
      <label className="form-label">Payment Method</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="form-select"
      >
        <option value="va_bca">Virtual Account BCA</option>
        <option value="qris">QRIS</option>
      </select>
    </div>
  );
};

export default SelectMethod;