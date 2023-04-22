import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { SpecialDayoffCategory } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const year = req.query as { year: string };
    const query = await db.specialDayoffTicket.findMany({
      where: {
        userId: req.session.user.id,
        year: parseInt(year.year),
        status: "Pending",
      },
      orderBy: {
        dueDate: "asc",
      },
      select: {
        id: true,
        category: true,
        days: true,
        dueDate: true,
      },
    });

    console.log(query);

    // const tickets = groupBy((ticket) => ticket.category, query);

    return res.status(200).json({
      ok: true,
      message: "특별휴가 티켓 조회 성공",
      result: query,
    });
  }

  if (req.method === "POST") {
    const body = req.body as {
      category: SpecialDayoffCategory;
      count: number;
      year: string;
    };
    // 같은 카테고리가 있는지 확인
    const hasTicket = await db.specialDayoffTicket.findFirst({
      where: {
        userId: req.session.user.id,
        year: parseInt(body.year),
        category: body.category,
      },
    });

    return res.status(201).json({
      ok: true,
      message: "특별휴가 티켓 생성 성공",
      result: {
        id: hasTicket?.id,
      },
    });
  }

  return res.status(200).json({
    ok: true,
  });
};

export default withApiSession(
  withHandler({
    method: ["GET"],
    isPrivate: false,
    roles: ["All"],
    handler,
  })
);
