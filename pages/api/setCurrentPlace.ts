import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import axios from "axios";
import { id } from "../../domain/games";

export default withApiAuthRequired(async (req, res) => {
  const session = getSession(req, res);

  const body: id & { place: string } = req.body;

  if (!session) {
    res.status(401).end();
  }

  if (req.method === "POST") {
    const url = new URL(
      `/api/user/${encodeURI(session?.user.sub)}/games/${
        body.id
      }/setCurrentPlace?code=${process.env.AZURE_FUNC_CODE}`,
      process.env.AZURE_FUNC_URL
    ).href;
    const response = await axios.post(url, {
      place: body.place,
    });
    console.log(body.id, session?.user.sub);
    res.status(200).json(response.data);
  } else {
    res.status(405).end();
  }
});
