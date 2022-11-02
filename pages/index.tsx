import { useAuth0 } from "@auth0/auth0-react";
import type { NextPage } from "next";
import MainLayout from "../components/layout/mainLayout";

const Home: NextPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <MainLayout>
      {!isAuthenticated && (
        <div className="m-9">
          <span>Welcome to planetary, log in to start playing</span>
        </div>
      )}
      {isAuthenticated && (
        <div className="m-9">
          <button className="btn btn-primary">Create New Game</button>
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
