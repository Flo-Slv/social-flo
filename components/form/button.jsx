const Button = ({ buttonId, type = "edit" }) => {
  return (
    <button
      id={buttonId}
      style={{ color: "#0060a0", cursor: "none" }}
      type="button"
      className="pl-10"
    >
      Edit
    </button>
  );
};

export default Button;
