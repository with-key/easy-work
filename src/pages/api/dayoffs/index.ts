import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

interface MyRequestBody {
  name: string;
  email: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.session.user?.id;

  // 관리자 기능
  // - 신청현황 조회
  //

  return res.status(200).json({});
}

export default withApiSession(
  withHandler({
    method: ["POST", "GET"],
    handler,
  })
);
