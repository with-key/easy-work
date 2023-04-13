import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAdming = req.session;

  const userId = req.session.user?.id;
  const query = req.query as { year: string };

  const dayoffs = await db.dayoff.findMany({
    where: {
      userId,
      year: +query.year,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return res.status(200).json({
    ok: true,
    dayoffs,
  });
};

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
