"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import validator from "validator";

import Image from "next/image";

import { ThemeContext } from "../../../context/theme/themeProvider.jsx";

import "../../../styles/frontend/signIn.scss";

import lightTheme from "../../../public/lightTheme.png";
import darkTheme from "../../../public/darkTheme.png";

const login = (data, refresh) => {
  // Try to login.
  fetch("/api/users/sign-in", {
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) throw new Error(res.error);

      // Redirect to profile if ok.
      // refresh() to force Root Layout to get jwt cookie.
      refresh("/");
    });
};

const SignIn = () => {
  const router = useRouter();
  const { dark, toggle } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Use validator to avoid xss attacks.
    const safeData = {
      email: validator.escape(formData.get("email")),
      password: validator.escape(formData.get("password")),
    };

    login(safeData, router.refresh);
  };

  return (
    <div className={`login ${dark ? "dark-mode" : "light-mode"}`}>
      <h1>Sign in</h1>

      <form onSubmit={handleSubmit} autoComplete={"off"}>
        <input type="email" name="email" placeholder="Email" required />

        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength="10"
          required
        />

        <button type="submit">Log in</button>
      </form>

      <div className={"login-buttons"}>
        <button>
          <Link href="/sign-up">Create an account</Link>
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

export default SignIn;
