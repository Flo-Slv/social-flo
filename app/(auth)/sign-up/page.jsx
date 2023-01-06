"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import validator from "validator";

import Image from "next/image";

import { ThemeContext } from "../../../context/theme/theme-provider.jsx";

import "../../../styles/frontend/sign-in.scss";

import lightTheme from "../../../public/light-theme.png";
import darkTheme from "../../../public/dark-theme.png";

const SignUp = () => {
  const { dark, toggle } = useContext(ThemeContext);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const safeData = {
      email: validator.escape(formData.get("email")),
      password: validator.escape(formData.get("password")),
      confirm_password: validator.escape(formData.get("confirm_password")),
    };

    // Try to create an account.
    fetch("/api/users/sign-up", {
      body: JSON.stringify(safeData),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) throw new Error(res.error);

        // Redirect to login if ok.
        // See if we can pass a message to this new page
        // like 'User successfully created, you can now log in'
        router.push("/sign-in");
      });
  };

  return (
    <div className={`login ${dark ? "dark-mode" : "light-mode"}`}>
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit} autoComplete={"off"}>
        <input type="email" name="email" placeholder="Email" required />

        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength="10"
          required
        />

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
          minLength="10"
          required
        />

        <button type="submit">Create an account</button>
      </form>

      <div className={"login-buttons"}>
        <button>
          <Link href="/sign-in">Sign-in</Link>
        </button>

        <button>
          <Link href="/">Back to home</Link>
        </button>
      </div>

      <div className={"login-image"}>
        <Image
          src={`${dark ? lightTheme.src : darkTheme.src}`}
          alt={`${dark ? "Dark" : "Light"} theme icon`}
          onClick={() => toggle()}
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default SignUp;
