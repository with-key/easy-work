import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

interface MyRequestBody {
  name: string;
  email: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAdming = req.session;
  const userId = req.session.user?.id;

  /**
   * 휴가 내역 생성
   *
   */

  return res.status(200).json({});
};

export default withApiSession(
  withHandler({
    method: ["POST", "GET"],
    handler,
  })
);
