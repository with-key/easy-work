import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from "@libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  console.log(email);

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    req.session.user = {
      id: user.id,
    };

    await req.session.save();
    res.status(200).end();
  }
  console.log(email);

  res.status(200).end();
};

export default withApiSession(withHandler("POST", handler));
