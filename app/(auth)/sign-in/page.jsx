"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useContext, useState } from "react";
import validator from "validator";

import Image from "next/image";

import { ThemeContext } from "../../../context/theme/theme-provider.jsx";

import "../../../styles/frontend/sign-in.scss";

import lightTheme from "../../../public/light-theme.png";
import darkTheme from "../../../public/dark-theme.png";

const SignIn = () => {
  const { dark, toggle } = useContext(ThemeContext);

  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Use validator to avoid xss attacks.
    const data = {
      email: validator.escape(formData.get("email")),
      password: validator.escape(formData.get("password")),
    };

    // Try to login.
    fetch("/api/users/sign-in", {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error);
          return null;
        }

        // Redirect to profile if ok.
        // refresh() to force Root Layout to get jwt cookie.
        router.refresh("/");
      });
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

      {error && <div>{error}</div>}

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
