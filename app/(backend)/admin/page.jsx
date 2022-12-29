const getUsers = async () => {
  // Find better way to handle this case !
  const nodeEnv = process.env.NODE_ENV;
  const baseUrl =
    nodeEnv === "development"
      ? "http://localhost:3000"
      : "https://palmares.info";
  const apiUrl = `${baseUrl}/api/users/get-users`;

  const res = await fetch(apiUrl);
  const { users } = await res.json();

  return users;
};

const Admin = async () => {
  const users = await getUsers();

  return (
    <div
      className={
        "flex flex-col justify-center items-center h-screen text-gray-100 gap-y-6"
      }
    >
      <table className={"border table-auto w-96"}>
        <caption>Users list</caption>
        <thead>
          <tr className={""}>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user, id) => {
            return (
              <tr key={id}>
                <td className={"pl-4"}>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>There are {users.length} users.</div>
    </div>
  );
};

export default Admin;
