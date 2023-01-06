import useSWR from "swr";

const useGetUserById = (id) => {
  const { data, error, isLoading } = useSWR(
    `/api/users/get-user-by-id?id=${id}`,
    (...args) => fetch(...args).then((res) => res.json())
  );

  return { data, error, isLoading };
};

export default useGetUserById;
