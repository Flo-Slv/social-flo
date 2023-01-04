"use client";

import useSWR from "swr";
import validator from "validator";
import { useContext, useEffect, useState } from "react";

import { CurrentUserContext } from "../../../context/current-user/current-user-provider.jsx";

import AdminInput from "../../../components/form/AdminInput.jsx";
import AdminEditButton from "../../../components/form/AdminEditButton.jsx";

import styles from "../../../styles/backend/profile.module.scss";

const updateUserById = (updatedData, setInitialUser, setUser, setError) => {
  fetch("/api/users/update-user-by-id", {
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        setError(res.error);
        return null;
      }

      setInitialUser(res.user);
      setUser(res.user);
    });
};

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [initialUser, setInitialUser] = useState({});
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [nameModified, setNameModified] = useState(Boolean(false));
  const [emailModified, setEmailModified] = useState(Boolean(false));

  const { data, err } = useSWR(
    `/api/users/get-user-by-id?id=${currentUser.id}`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  if (err) {
    console.error("profile - data fetching error: ", err);
    setError(err);
  }

  useEffect(() => {
    if (data) {
      setInitialUser(data.user);

      data.user.modifiedField = "";
      setUser(data.user);
    }
  }, [data]);

  useEffect(() => {
    const nameEditButton = document.getElementById("editButton-name");
    const emailEditButton = document.getElementById("editButton-email");

    if (!user.modifiedField) {
      nameEditButton.setAttribute("disabled", "");
      emailEditButton.setAttribute("disabled", "");

      setNameModified(Boolean(false));
      setEmailModified(Boolean(false));
    }

    if (user.modifiedField === "name") {
      if (!user.name || initialUser.name === user?.name.trim()) {
        nameEditButton.setAttribute("disabled", "");
        setNameModified(Boolean(false));
      }

      if (user?.name && nameEditButton) {
        if (initialUser.name !== user?.name.trim()) {
          nameEditButton.removeAttribute("disabled");
          setNameModified(Boolean(true));
        }
      }
    }

    if (user.modifiedField === "email") {
      if (!user.email || initialUser.email === user?.email.trim()) {
        emailEditButton.setAttribute("disabled", "");
        setEmailModified(Boolean(false));
      }

      if (user?.email && emailEditButton) {
        if (initialUser.email !== user?.email.trim()) {
          emailEditButton.removeAttribute("disabled");
          setEmailModified(Boolean(true));
        }
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setUser({
      ...user,
      [id]: value ? value : null,
      modifiedField: id,
    });
  };

  const handleClick = (e, data) => {
    e.preventDefault;

    // Use validator to avoid xss attacks.
    const updatedData = {
      id: validator.escape(data.id),
      field: validator.escape(data.field),
      data: validator.escape(data.value),
    };

    updateUserById(updatedData, setInitialUser, setUser, setError);
  };

  return (
    <div
      className={`${styles.profile} flex flex-col items-center justify-center h-screen overflow-hidden`}
    >
      <form
        className={"flex flex-col border border-white rounded-xl px-20 py-20"}
        style={{ backgroundColor: "#0060a0" }}
      >
        <label className="block pb-10">
          <span className="text-gray-400">Name</span>
          <div className="flex">
            <AdminInput
              id="name"
              placeholder={
                initialUser?.name ? "Modify your name" : "Enter your name"
              }
              value={user?.name || ""}
              handleOnChange={handleChange}
            />

            <AdminEditButton
              buttonId="editButton-name"
              data={{ id: user.id, field: "name", value: user.name }}
              click={handleClick}
              isModified={nameModified}
            />
          </div>
        </label>
        <label className="block pb-10">
          <span className="text-gray-400">Email</span>
          <div className="flex">
            <AdminInput
              id="email"
              type="email"
              placeholder={
                user?.email ? "Modify your email" : "Enter your email"
              }
              value={user?.email || ""}
              handleOnChange={handleChange}
            />

            <AdminEditButton
              buttonId="editButton-email"
              data={{ id: user.id, field: "email", value: user.email }}
              click={handleClick}
              isModified={emailModified}
            />
          </div>
        </label>
        {currentUser?.role === "ADMIN" && (
          <label className="block">
            <span className="text-gray-400">Role</span>
            <AdminInput
              id="role"
              value={user?.role || ""}
              readOnly={Boolean(true)}
            />
          </label>
        )}
      </form>

      {error && <div>{error}</div>}
    </div>
  );
};

export default Profile;
