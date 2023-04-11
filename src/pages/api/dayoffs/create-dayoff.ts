import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

interface MyRequestBody {
  name: string;
  email: string;
}

/**
 * 관리자의 휴가 생성
 * - 새로운 휴가를 생성
 * - 소멸, 이월로 인한 휴가 소거
 */

const useDayoff = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAdming = req.session;
  const userId = req.session.user?.id;

  /**
   * 휴가 내역 생성
   * valia=
   */

  return res.status(200).json({});
};

export default withApiSession(
  withHandler({
    method: ["POST", "GET"],
    handler: useDayoff,
  })
);
