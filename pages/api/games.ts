import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import axios from "axios";

export type CreateGameDto = {
  name: string;
};

export type LoadGameDto = {
  id: string;
  userId: string;
  characterName: string;
};


export default withApiAuthRequired(async (req, res) => {
  const session = getSession(req, res);

  if (!session) {
    res.status(401).end();
  }

  if (req.method === "POST") {
    const url = new URL("/api/CreateGame", process.env.AZURE_FUNC_URL).href;
    await axios.post(url, {
      userId: session?.user.sub,
      characterName: req.body.name,
    });
    console.log(req.body.name, session?.user.sub);
    res.status(204).end();
  }
  else {
    res.status(405).end();
  }
});
