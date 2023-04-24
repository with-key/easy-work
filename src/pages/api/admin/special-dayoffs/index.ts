import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as {
    specialDayoffId: number;
    status: "Approved" | "Rejected";
  };

  if (req.method === "GET") {
    const specialDayoff = await db.specialDayoff.findMany({
      select: {
        id: true,
        category: true,
        createAt: true,
        user: {
          select: { name: true },
        },
      },
    });
    return res.status(200).json({
      ok: true,
      result: specialDayoff,
      message: "특별휴가 신청 대기목록 조회 성공",
    });
  }

  if (req.method === "PATCH") {
    const { specialDayoffId, status } = body;
    const dayoff = await db.specialDayoff.update({
      where: {
        id: specialDayoffId,
      },
      data: {
        status,
      },
    });

    if (status === "Rejected") {
      await db.specialDayoffTicket.update({
        where: {
          id: dayoff.ticketId,
        },
        data: {
          status: "Pending",
        },
      });

      return res.status(201).json({
        ok: true,
        message: "특별휴가가 거절되었습니다.",
      });
    }

    return res.status(201).json({
      ok: true,
      message: "특별휴가가 승인되었습니다.",
    });
  }
};

export default withApiSession(
  withHandler({
    method: ["POST", "PATCH", "GET"],
    isPrivate: false,
    roles: ["All"],
    handler,
  })
);
