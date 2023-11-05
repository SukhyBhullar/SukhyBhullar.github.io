import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import router from "next/router";
import React from "react";
import CenteredBox from "../../components/common/centeredBox";
import Info from "../../components/common/info";
import MainLayout from "../../components/layout/mainLayout";
import { Game, id } from "../../domain/games";
import { FindAll } from "../../data/mongoInstance";

type GetGamesResponse = id & Game;

type Props = { data: GetGamesResponse[] };

const LoadGameClicked = async (gameId: string) => {
  window.sessionStorage.setItem("currentGame", gameId);
  // ​/user​/{userid}​/games​/{id}
  const newGame = await axios.get(`/api/games?id=${gameId}`);
  router.push(`/place/${newGame.data.currentPlace}`);
};

const LoadGame = (props: Props) => {
  return (
    <MainLayout>
      <CenteredBox className="w-1/4">
        <div className="flex flex-col gap-6 mx-auto w-3/4">
          {props.data.length === 0 && <Info message={"Please create a game"} />}
          {props.data.map((game) => (
            <div
              key={game.id}
              className="rounded boxborder flex flex-row gap-7 p-4 items-center justify-between"
            >
              <h2 className="text-xl font-bold text-white">
                Captain {game.callSign}
              </h2>
              <button
                className="btn btn-primary"
                onClick={() => LoadGameClicked(game.id)}
              >
                Load Game
              </button>
            </div>
          ))}
        </div>
      </CenteredBox>
    </MainLayout>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const data = await FindAll("games", session?.user.sub);
    console.log(data);
    return { props: { data } };
  },
});

export default LoadGame;
