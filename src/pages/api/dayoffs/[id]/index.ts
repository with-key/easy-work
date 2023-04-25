import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import DayoffsService from "@server/features/dayoff/services/dayoff.service";

import { goDayoffService } from "@server/features/dayoff/services/goDayoffService";

import db from "@libs/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const dayoffService = DayoffsService(req, res);

  const query = req.query as { year: string; id: string }; // query
  const dayoffId = query.id;

  // 사용자의 휴가 내역 조회
  if (req.method === "GET") {
    return dayoffService.getDayoffById();
  }

  // 사용자의 휴가 사용
  if (req.method === "POST") {
    return goDayoffService(req, res);
  }

  if (req.method === "DELETE") {
    const result = await db.dayoff.delete({
      where: {
        id: Number(dayoffId),
      },
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "휴가 삭제 성공",
      result,
    });
  }

  if (req.method === "PUT") {
    return;
  }
};

export default withApiSession(
  withHandler({
    method: ["GET", "DELETE", "POST", "PUT"],
    isPrivate: false,
    roles: ["All"],
    handler,
  })
);
