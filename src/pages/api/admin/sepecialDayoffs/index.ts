import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { SpecialDayoffCategory } from "@prisma/client";

/**
 * 특별휴가 발급
 * - Apple vacation는 공휴일을 포함한다.
 * - 리프레시 휴가는 공휴일을 포함하지 않고, 1년에 1회만 발급 가능하다.
 * - 여름휴가는 공휴일을 포함하지 않고, 1년에 1회만 발급 가능하다.
 * - 멍떠는 공휴일을 포함하지 않고, 1년에 여러번 방급 가능하다.
 */

// 관리자의 특별 휴가 발급
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as {
    userId: number;
    category: SpecialDayoffCategory;
    startDate: string;
    endDate: string;
  };

  if (req.method === "POST") {
  }
};

export default withApiSession(
  withHandler({
    method: ["POST"],
    isPrivate: false,
    roles: ["All"],
    handler,
  })
);
