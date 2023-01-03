"use client";

const Button = ({ buttonId, data, click }) => {
  return (
    <button
      id={buttonId}
      type="button"
      className="ml-10 pr-4 pl-4 text-gray-400 border border-gray-400 rounded-sm"
      style={{ cursor: "none" }}
      onClick={(e) => click(e, data)}
    >
      Edit
    </button>
  );
};

export default Button;
