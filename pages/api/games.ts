import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { Game, currentPlace, id, userId } from "../../domain/games";
import { Mongo, FindById } from "../../data/mongoInstance";

export type LoadGameDto = id & userId & Game;

export default withApiAuthRequired(async (req, res) => {
  const session = getSession(req, res);

  const body: Game = req.body;

  const games = "games";

  if (!session) {
    res.status(401).end();
  }

  if (req.method === "POST") {
    const game: userId & Game & currentPlace = {
      userId: session?.user.sub,
      callSign: body.callSign,
      firstName: body.firstName,
      lastName: body.lastName,
      currentPlace: "92ac2107-2b20-42f7-bb1c-17af5260883d",
    };

    const result = await (await Mongo()).collection(games).insertOne(game);
    console.log(result);
    const insertedGame: userId & id & Game = {
      ...game,
      id: result.insertedId.toString(),
    };

    res.status(200).json(insertedGame);
    return;
  }
  if (req.method === "GET") {
    console.log(req.body.name, session?.user.sub);
    const result = await FindById(
      games,
      req.query.id as string,
      session?.user.sub
    );
    res.status(200).json(result);
    return;
  }

  res.status(405).end();
});
