"use client";

const AdminEditButton = ({
  buttonId,
  data,
  click,
  isModified = Boolean(false),
}) => {
  return (
    <button
      id={buttonId}
      type="button"
      ismodified={isModified.toString()} // toString() to avoid error
      className={`
				cursor-auto
				ml-10
				pr-4
				pl-4
				border
				border-white
				rounded-sm
				opacity-75
				${isModified ? "bg-green-700 cursor-pointer hover:bg-green-600" : "bg-red-400"}
			`}
      onClick={(e) => click(e, data)}
    >
      Edit
    </button>
  );
};

export default AdminEditButton;
