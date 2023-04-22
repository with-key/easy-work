import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { SpecialDayoffCategory } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 사용자의 특별 휴가 신청
  if (req.method === "POST") {
    const body = req.body as {
      category: SpecialDayoffCategory;
      count: number;
      year: string;
    };

    // ticket이 있는지 확인
    const hasTicket = await db.specialDayoffTicket.findFirst({
      where: {
        userId: req.session.user.id,
        year: parseInt(body.year),
        category: body.category,
      },
    });

    console.log(hasTicket);
  }
};

export default withApiSession(
  withHandler({
    method: ["POST", "GET"],
    isPrivate: false,
    roles: ["All"],
    handler,
  })
);
