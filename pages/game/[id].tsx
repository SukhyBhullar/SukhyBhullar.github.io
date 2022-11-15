import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import CenteredBox from "../../components/common/centeredBox";
import MainLayout from "../../components/layout/mainLayout";
import { Game, id } from "../../domain/games";

type GetGamesResponse = id & Game;

type Props = { data: GetGamesResponse };

const LoadGame = (props: Props) => {
  return (
    <MainLayout>
      <CenteredBox className="w-1/4">
        <div className="flex flex-col gap-6 mx-auto w-3/4">
          <h2 className="text-xl font-bold text-white">
            Welcome Captain {props.data.callSign}
          </h2>
        </div>
      </CenteredBox>
    </MainLayout>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const url = new URL(
      `api/user/${session?.user.sub}/games/${ctx.params?.id}?code=${process.env.AZURE_FUNC_CODE}`,
      process.env.AZURE_FUNC_URL
    ).href;

    const res = await fetch(url);
    const data = await res.json();

    return { props: { data } };
  },
});

export default LoadGame;
