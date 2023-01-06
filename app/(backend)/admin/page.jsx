"use client";

import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import useGetUsers from "../../../utils/swr/getUsers.js";

const columns = [
  { field: "id", headerName: "ID", width: 240 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "role", headerName: "Role", width: 90 },
];

const Admin = () => {
  const [users, setUsers] = useState([]);
  const { data, error } = useGetUsers();

  if (error) throw new Error(error);

  useEffect(() => {
    if (data) setUsers(data.users);
  }, [data]);

  console.log("users: ", users);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className={"w-screen lg:w-[800px] sm:w-screen h-[400px]"}>
        <DataGrid
          className="bg-color-2"
          style={{ color: "white" }}
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Admin;

// <div
//   className={
//     "flex flex-col justify-center items-center h-screen text-gray-100 gap-y-6"
//   }
// >
//   //{" "}
// </div>;

// <div>There are {users.length} users.</div>

// <table className={"border table-auto w-[400px]"}>
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
