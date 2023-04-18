import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";

// 현재 재직중인 유저 리스트 조회
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const users = await db.user.findMany({
      where: {
        isWorking: true,
      },
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "유저 조회 성공",
      result: users,
    });
  }
};

export default withApiSession(
  withHandler({
    method: ["POST", "GET", "DELETE", "PUT"],
    isPrivate: true,
    roles: ["All"],
    handler,
  })
);
