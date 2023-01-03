"use client";

const Error = ({ error, reset }) => {
  console.log("client error sign-in: ", error);

  return (
    <div>
      <p>Something went wrong !</p>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
};

export default Error;
