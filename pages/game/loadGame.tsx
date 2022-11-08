import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import MainLayout from "../../components/layout/mainLayout";

type GetGamesResponse = {
  id: string;
  userId: string;
  characterName: string;
};

type Props = { data: GetGamesResponse[] };

const LoadGame = (props: Props) => {
  const handleLoad = (id: string) => {
    console.log(id);
  };

  return (
    <MainLayout>
      <div className="mx-auto my-auto w-1/4 h-screen flex flex-col justify-center">
        <div className="flex flex-col rounded boxborder p-7 gap-6">
          <div className="flex flex-col gap-6 mx-auto w-3/4">
            {props.data.map((game) => (
              <div key={game.id} className="rounded boxborder flex flex-row gap-7 p-4 items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  Captain {game.characterName}
                </h2>
                <button className="btn btn-primary" onClick={() => handleLoad(game.id)}>
                  Load Game
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = withPageAuthRequired({
  //returnTo: '/foo',
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    //check the console of backend, you will get tokens here
    const url = new URL(
      `api/user/${session?.user.sub}/games/`,
      process.env.AZURE_FUNC_URL
    ).href;

    const res = await fetch(url);
    const data = await res.json();

    return { props: { data } };
  },
});

export default LoadGame;
