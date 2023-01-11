import { useLogoutFunction } from "@propelauth/react-test";

export const Dashboard = () => {
  const logout = useLogoutFunction();
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => logout(true)}>Logout</button>
    </div>
  );
};
