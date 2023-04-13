import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import DayoffsService from "@server/features/dayoff/services/dayoff.service";

/**
 * 특정 id의 dayoff 조회 / 삭제 / 수정
 *
 */

const getDayoffById = () => {
  return;
};

const deleteDayoff = () => {
  return;
};

const editDayoff = () => {};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const dayoffService = DayoffsService();

  const query = req.query as { year: string; id: string }; // query
  const sessionUserId = req.session.user?.id; // 세션 아이디

  const year = +query.year;
  const userId = +query.id;

  /**
   * 특정 유저의 휴가내역 조회 (발행, 사용, 이월, 소멸 모두 표시)
   *
   */
  if (req.method === "GET") {
    const result = await dayoffService.getDayoffById(14, sessionUserId);

    return res.status(200).json({
      ok: true,
      dayoff: result,
    });
  }

  if (req.method === "POST") {
    return res.status(200).end();
  }
};

export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    handler,
  })
);
