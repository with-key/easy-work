import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";

/**
 * @doc 사용자의 휴가 신청 내역 조회 리스트
 *
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.session.user?.id;

  try {
    const dayoffList = await db.dayoff.findMany({
      where: {
        type: "Used",
        status: "Pending",
      },
      select: {
        id: true,
        category: true,
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
      result: dayoffList,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        ok: false,
      });
    }
  }
};

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
