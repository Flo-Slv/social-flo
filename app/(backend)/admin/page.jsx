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

  console.log(users);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Users list</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
