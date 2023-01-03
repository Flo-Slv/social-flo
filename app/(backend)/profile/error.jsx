"use client";

const Error = ({ error, reset }) => {
  console.log("client error profile: ", error);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-red-500">
      <p>Something went wrong !</p>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
};

export default Error;
