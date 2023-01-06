"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useReactTable } from "@tanstack/react-table";

const Admin = () => {
  const [users, setUsers] = useState({});

  const { data, err } = useSWR("api/users/get-users", (...args) =>
    fetch(...args).then((res) => res.json())
  );

  if (err) {
    console.error("profile - data fetching error: ", err);
    setError(err);
  }

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  const table = useReactTable({});
  console.log("table: ", table);

  return (
    <div
      className={
        "flex flex-col justify-center items-center h-screen text-gray-100 gap-y-6"
      }
    >
      <div>There are {users.length} users.</div>
    </div>
  );
};

export default Admin;

// <table className={"border table-auto w-96"}>
//   <caption>Users list</caption>
//   <thead>
//     <tr className={""}>
//       <th>Name</th>
//       <th>Email</th>
//       <th>Role</th>
//     </tr>
//   </thead>
//
//   <tbody>
//     {users?.map((user, id) => {
//       return (
//         <tr key={id}>
//           <td className={"pl-4"}>{user?.name}</td>
//           <td>{user?.email}</td>
//           <td>{user?.role}</td>
//         </tr>
//       );
//     })}
//   </tbody>
// </table>
