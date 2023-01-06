"use client";

import { useContext } from "react";
import { CurrentUserContext } from "../../../context/currentUser/currentUserProvider.jsx";

const Sports = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className={"test"}>
      <div>Name: {currentUser?.name || "no name yet..."}</div>

      <div>Email: {currentUser?.email}</div>
    </div>
  );
};

export default Sports;
