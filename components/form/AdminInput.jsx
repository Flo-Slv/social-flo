const AdminInput = ({
  id,
  type = "text",
  placeholder = "",
  value,
  handleOnChange = () => {},
  readOnly = Boolean(false),
}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleOnChange(e)}
      className="block form-input px-4 py-3 placeholder-gray-400 focus:ring-0 focus:border-black border-0 border-b-2 border-gray-400"
      style={{ backgroundColor: "#0060a0" }}
      readOnly={readOnly}
    />
  );
};

export default AdminInput;
