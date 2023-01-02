const AuthLoader = ({ page }) => {
  return (
    <div className={"flex justify-center items-center h-screen"}>
      <h1 className={"text-orange-300"}>{page} is loading...</h1>
    </div>
  );
};

export default AuthLoader;
