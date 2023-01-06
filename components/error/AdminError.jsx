"use client";

const AdminError = ({ error, reset, page }) => (
  <div className="flex flex-col justify-center items-center h-screen text-red-500">
    <p>Something went wrong on {page} component !</p>
    <p>{error.message}</p>
    <button
      className="p-2 mt-4 border border-white rounded"
      onClick={() => reset()}
    >
      Reset error boundary
    </button>
  </div>
);

export default AdminError;
