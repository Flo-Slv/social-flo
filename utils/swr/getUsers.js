import useSWR from "swr";

const useGetUsers = () => {
  const { data, error, isLoading } = useSWR("/api/users/getUsers", (...args) =>
    fetch(...args).then((res) => res.json())
  );

  return { data, error, isLoading };
};

export default useGetUsers;
