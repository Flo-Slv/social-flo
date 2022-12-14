"use client";

import AdminError from "../../../components/error/AdminError.jsx";

const Error = ({ error, reset }) => (
  <AdminError error={error} reset={reset} page={"Profile"} />
);

export default Error;
