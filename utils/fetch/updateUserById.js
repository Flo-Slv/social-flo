const useUpdateUserById = async (safeData) => {
  const res = await fetch("/api/users/updateUserById", {
    body: JSON.stringify(safeData),
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  });

  if (!res.ok) return { error: { message: "Failed to update user !" } };

  const data = await res.json();

  return { user: data.user };
};

export default useUpdateUserById;
