"use client";

import NavContent from "./NavContent.jsx";

const Navbar = ({ currentUser }) => {
  return (
    <>
      {Object.keys(currentUser).length !== 0 ? (
        <NavContent isAdmin={currentUser?.role === "ADMIN"} />
      ) : null}
    </>
  );
};

export default Navbar;
