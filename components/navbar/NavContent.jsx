"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import "../../styles/backend/navbar.scss";

const NavContent = ({ isAdmin }) => {
  const [isActive, setIsActive] = useState(Boolean(false));

  const router = useRouter();

  const handleLogout = () => {
    fetch("/api/users/sign-out", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log("logout error: ", res.error);
          return null;
        }

        // Redirect to homepage if ok.
        router.refresh("/");
      });
  };

  const toggleActive = () => setIsActive((isActive) => !isActive);

  return (
    <div
      className={`nav-container${
        isActive && isAdmin
          ? " nav-container-active-admin"
          : isActive && !isAdmin
          ? " nav-container-active"
          : ""
      }`}
    >
      <button
        className={`nav-toggle${isActive ? " nav-active" : ""}`}
        onClick={() => toggleActive()}
      >
        <span className={"nav-icon"}></span>
      </button>

      <ul className={`nav-content${isActive ? " nav-content-active" : ""}`}>
        <li>
          <Link href="/profile">
            <i className="fa fa-user" style={{ "--i": 1 }}></i>
            <span style={{ "--g": 1 }}>Profile</span>
          </Link>
        </li>

        <li>
          <Link href="/sports">
            <i className="fa fa-medal" style={{ "--i": 2 }}></i>
            <span style={{ "--g": 2 }}>Sports</span>
          </Link>
        </li>

        <li>
          <Link href="/todo">
            <i className="fa fa-list" style={{ "--i": 3 }}></i>
            <span style={{ "--g": 3 }}>To do</span>
          </Link>
        </li>

        <li onClick={() => handleLogout()}>
          <a>
            <i
              className="fa-solid fa-right-from-bracket"
              style={{ "--i": 4 }}
            ></i>
            <span style={{ "--g": 4 }}>Logout</span>
          </a>
        </li>

        {isAdmin && (
          <li>
            <Link href="/admin">
              <i className="fa fa-list" style={{ "--i": 5 }}></i>
              <span style={{ "--g": 5 }}>Admin</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavContent;
