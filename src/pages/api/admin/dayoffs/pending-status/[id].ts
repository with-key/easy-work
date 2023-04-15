import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { Roles } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";

/**
 * @doc 사용자의 휴가 신청 내역 조회 리스트
 *
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const dayoffId = req.query.id?.toString();

  if (req.method === "GET") {
    if (!dayoffId) {
      return res.status(400).json({
        ok: false,
        message: "잘못된 요청입니다.",
      });
    }

    // 휴가내역 상세 조회
    const dayoff = await db.dayoff.findUnique({
      where: {
        id: +dayoffId,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    return res.status(200).json({
      ok: true,
      message: "휴가 신청 내역 조회 성공",
      result: dayoff,
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
