"use client";

import { useContext } from "react";
import { CurrentUserContext } from "../../../context/current-user/current-user-provider.jsx";

import styles from "../../../styles/backend/profile.module.scss";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div
      className={`${styles.profile} flex flex-col items-center justify-center h-screen`}
    >
      <div>Name: {currentUser?.name || "no name yet..."}</div>

      <div>Email: {currentUser?.email}</div>

      {currentUser?.role === "ADMIN" && <div>Role: {currentUser?.role}</div>}
    </div>
  );
};

export default Profile;
