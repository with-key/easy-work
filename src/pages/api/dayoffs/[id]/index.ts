import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import DayoffsService from "@server/features/dayoff/services/dayoff.service";
import { goDayoffService } from "@server/features/dayoff/services/goDayoffService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const dayoffService = DayoffsService();

  const query = req.query as { year: string; id: string }; // query
  const sessionUserId = req.session.user?.id; // 세션 아이디

  const year = +query.year;
  const userId = +query.id;

  // 사용자의 휴가 내역 조회
  if (req.method === "GET") {
    const result = await dayoffService.getDayoffById(14, sessionUserId);

    return res.status(200).json({
      ok: true,
      dayoff: result,
    });
  }

  // 사용자의 휴가 사용
  if (req.method === "POST") {
    return goDayoffService(req, res);
  }
};

export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    isPrivate: true,
    roles: ["All"],
    handler,
  })
);
