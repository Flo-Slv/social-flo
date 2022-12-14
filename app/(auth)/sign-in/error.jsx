"use client";

import AuthError from "../../../components/error/AuthError.jsx";

const Error = ({ error, reset }) => (
  <AuthError error={error} reset={reset} page={"Sign-in"} />
);

export default Error;
