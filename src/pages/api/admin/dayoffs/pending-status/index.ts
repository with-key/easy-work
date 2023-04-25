import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Roles } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";

/**
 * @doc 사용자의 휴가 신청 내역 조회 리스트
 *
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const dayoffList = await db.dayoff.findMany({
      where: {
        type: "Used",
        status: "Pending",
      },
      select: {
        id: true,
        createAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      ok: true,
      message: "휴가 신청 내역 조회 성공",
      result: dayoffList,
    });
  }

  return res.status(400).json({
    ok: false,
    message: "잘못된 요청입니다.",
  });
};

export default withApiSession(
  withHandler({
    method: ["GET"],
    roles: ["Admin"],
    isPrivate: false,
    handler,
  })
);
