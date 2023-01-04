"use client";

const Button = ({ buttonId, data, click }) => {
  return (
    <button
      id={buttonId}
      type="button"
      className="ml-10 pr-4 pl-4 border border-white rounded-sm"
      style={{ cursor: "none" }}
      onClick={(e) => click(e, data)}
    >
      Edit
    </button>
  );
};

export default Button;
