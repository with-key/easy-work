import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { SpecialDayoffCategory } from "@prisma/client";
import { calculateDays } from "@server/features/dayoff/logic/calculateDays";

type Day = "AM" | "PM";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 사용자의 특별 휴가 신청
  if (req.method === "POST") {
    const { startDate, endDate, startDateAt, endDateAt, year, category } =
      req.body as {
        category: SpecialDayoffCategory;
        year: string;
        startDate: Date;
        endDate: Date;
        startDateAt: Day;
        endDateAt: Day;
      };

    // ticket이 있는지 확인
    const ticket = await db.specialDayoffTicket.findFirst({
      where: {
        userId: req.session.user.id,
        year: parseInt(year),
        category: category,
        status: "Pending",
      },
    });

    // ticket이 없으면 에러
    if (!ticket) {
      return res.status(400).json({
        ok: false,
        message: "사용가능한 티켓 없음",
      });
    }

    // 사용가능한 티켓일수
    const enabledDays = ticket.days;

    // 휴가일수 계산
    const { days } = await calculateDays(
      startDate,
      endDate,
      startDateAt,
      endDateAt
    );

    if (days > enabledDays) {
      return res.status(400).json({
        ok: false,
        message: `사용 가능일자를 초과했습니다. (신청가능일자 ${enabledDays}일, 신청일자 ${days}일)`,
      });
    }

    // 휴가 생성
    const result = await db.specialDayoff.create({
      data: {
        category,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        days: -days,
        year: parseInt(year),
        userId: req.session.user.id,
        ticketId: ticket.id,
      },
    });

    if (result) {
      // hasTicket의 status를 used로 변경
      await db.specialDayoffTicket.update({
        where: {
          id: ticket.id,
        },
        data: {
          status: "Used",
        },
      });
    }

    return res.status(201).json({
      ok: true,
      message: `특별휴가 신청 성공 (가능일자 ${enabledDays}일, 신청일자 ${days}일)`,
      result,
    });
  }

  return res.status(201).json({
    ok: true,
  });
};

export default withApiSession(
  withHandler({
    method: ["POST", "PATCH"],
    isPrivate: false,
    roles: ["All"],
    handler,
  })
);
