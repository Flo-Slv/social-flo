"use client";

import useSWR from "swr";
import { useContext, useEffect, useState } from "react";

import { CurrentUserContext } from "../../../context/current-user/current-user-provider.jsx";

import Button from "../../../components/form/button.jsx";

import styles from "../../../styles/backend/profile.module.scss";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [initialUser, setInitialUser] = useState({});
  const [user, setUser] = useState({});

  const { data, error } = useSWR(
    `/api/users/get-user-by-id?id=${currentUser.id}`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  if (error) console.error(error);

  useEffect(() => {
    if (data) {
      setInitialUser(data.user);
      setUser(data.user);
    }
  }, [data]);

  // Find how to deal with email too... find a generic way to do it !
  useEffect(() => {
    const nameEditButton = document.getElementById("editButton-name");
    const emailEditButton = document.getElementById("editButton-email");

    if (!user.name || initialUser.name === user?.name.trim()) {
      nameEditButton.style.color = "#0060a0";
      nameEditButton.style.cursor = "auto";
      nameEditButton.disabled = Boolean(true);
    }

    if (user?.name && nameEditButton)
      if (initialUser.name !== user?.name.trim()) {
        nameEditButton.style.color = "white";
        nameEditButton.style.cursor = "pointer";
        nameEditButton.disabled = Boolean(false);
      }
  }, [user]);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setUser({
      ...user,
      [id]: value ? value : null,
    });
  };

  const handleEdit = (user) => {
    setInitialUser(user);
    setUser(user);
  };

  return (
    <div
      className={`${styles.profile} flex flex-col items-center justify-center h-screen overflow-hidden`}
    >
      <form
        className={
          "flex flex-col border border-white rounded-xl px-20 py-20 text-white"
        }
        style={{ backgroundColor: "#0060a0" }}
      >
        <label className="block pb-10">
          <span className="text-gray-400">Name</span>
          <div className="flex">
            <input
              id="name"
              type="text"
              placeholder={user?.name ? "Modify your name" : "Enter your name"}
              value={user?.name || ""}
              onChange={(e) => handleChange(e)}
              className="block form-input px-4 py-3 placeholder-gray-400 focus:ring-0 focus:border-black border-0 border-b-2 border-gray-400"
              style={{ backgroundColor: "#0060a0" }}
            />
            <Button
              buttonId="editButton-name"
              type="edit"
              disabled={Boolean(true)}
              data={{ id: user.id, field: "name", data: user.name }}
              updateState={handleEdit}
            />
          </div>
        </label>
        <label className="block pb-10">
          <span className="text-gray-400">Email</span>
          <input
            id="email"
            type="email"
            placeholder="Modify your email"
            value={user?.email || ""}
            onChange={(e) => handleChange(e)}
            className="block form-input px-4 py-3 placeholder-gray-400 focus:ring-0 focus:border-black border-0 border-b-2 border-gray-400"
            style={{ backgroundColor: "#0060a0" }}
          />
          <Button buttonId="editButton-email" type="edit" />
        </label>
        {currentUser?.role === "ADMIN" && (
          <label className="block">
            <span className="text-gray-400">Role</span>
            <input
              id="role"
              type="text"
              value={user?.role || ""}
              className="block form-input px-4 py-3 placeholder-gray-400 focus:ring-0 focus:border-black border-0 border-b-2 border-gray-400"
              style={{ backgroundColor: "#0060a0" }}
              readOnly
            />
          </label>
        )}
      </form>
    </div>
  );
};

export default Profile;
