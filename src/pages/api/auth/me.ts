import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

import db from "@libs/server/db";
import { withApiSession } from "@libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionUserId = req.session.user?.id;

  try {
    // 세션으로 유저 조회
    const user = await db.user.findUnique({
      where: {
        id: sessionUserId,
      },
      select: {
        id: true,
        name: true,
        role: true,
      },
    });
    return res.status(200).json({
      ok: true,
      profile: {
        id: user?.id,
        name: user?.name,
        role: user?.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
    });
  }
};

export default withApiSession(
  withHandler({
    isPrivate: true,
    method: ["GET"],
    roles: ["All"],
    handler,
  })
);
