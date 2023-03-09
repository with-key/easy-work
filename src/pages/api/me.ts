import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const profile = await db.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });

  res.status(200).json({
    ok: true,
    profile: {
      name: profile?.name,
    },
  });
};

export default withApiSession(withHandler("GET", handler));
