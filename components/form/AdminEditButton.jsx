"use client";

import validator from "validator";

const updateUserById = (updatedData, updateState) => {
  fetch("/api/users/update-user-by-id", {
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) console.log("res error: ", error);

      updateState(res.user);
    });
};

const Button = ({ buttonId, type = "edit", data, updateState }) => {
  const handleClick = (e) => {
    e.preventDefault;

    if (type === "edit") {
      // Use validator to avoid xss attacks.
      const updatedData = {
        id: validator.escape(data.id),
        field: validator.escape(data.field),
        data: validator.escape(data.data),
      };

      updateUserById(updatedData, updateState);
    }
  };

  return (
    <button
      id={buttonId}
      style={{ color: "#0060a0", cursor: "none" }}
      type="button"
      className="pl-10"
      onClick={(e) => handleClick(e)}
    >
      Edit
    </button>
  );
};

export default Button;
