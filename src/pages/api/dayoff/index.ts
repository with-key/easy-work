import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

/*-------------------------------------------*
 * DayoffList 조회
 *-------------------------------------------*/

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.session.user?.id;

  if (req.method === "GET") {
    const dayoffList = await db.dayoff.findMany({
      where: {
        userId,
      },
    });

    const count = await db.dayoff.count({
      where: {
        userId,
      },
    });

    console.log("count", count);

    return res.status(200).json({
      dayoffList,
      ok: true,
    });
  }

  if (req.method === "POST") {
    console.log("post");
  }

  return res.status(200).end();
}

export default withApiSession(
  withHandler({
    method: ["POST", "GET"],
    handler,
  })
);
