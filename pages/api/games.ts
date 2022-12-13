import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { Game, id, userId } from "../../domain/games";

export type LoadGameDto = id & userId & Game;

export default withApiAuthRequired(async (req, res) => {
  const session = getSession(req, res);

  const body: Game = req.body;

  if (!session) {
    res.status(401).end();
  }

  if (req.method === "POST") {
    const url = new URL(
      `/api/CreateGame?code=${process.env.AZURE_FUNC_CODE}`,
      process.env.AZURE_FUNC_URL
    ).href;
    const response = await axios.post<userId & Game>(url, {
      userId: session?.user.sub,
      callSign: body.callSign,
      firstName: body.firstName,
      lastName: body.lastName,
    });
    console.log(req.body.name, session?.user.sub);
    res.status(200).json(response.data);
  }
  if (req.method === "GET") {
    const url = new URL(
      `/api/user/${encodeURI(session?.user.sub)}/games/${req.query.id}?code=${
        process.env.AZURE_FUNC_CODE
      }`,
      process.env.AZURE_FUNC_URL
    ).href;
    const response = await axios.get(url);
    console.log(req.body.name, session?.user.sub);
    res.status(200).json(response.data);
  }
  // else {
  //   res.status(405).end();
  // }
});
