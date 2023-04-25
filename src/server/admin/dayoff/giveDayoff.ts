import { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import dayoffRepository from "@server/features/dayoff/repositories/dayoffs.repository";
import db from "@libs/server/db";
import { DayoffType } from "@prisma/client";

export type GiveDayoffDto = {
  userId: string;
  days: number;
};

// 관리자의 연차 부여
export const giveDayoff = async (req: NextApiRequest, res: NextApiResponse) => {
  const { create, getUserDayoffCount } = dayoffRepository();
  const { userId, days } = req.body as GiveDayoffDto;

  const id = +userId;
  const today = dayjs().format("YYYY-MM-DD");

  // 유저 확인
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return res.status(404).json({
      ok: false,
      message: "존재하지 않는 유저입니다.",
    });
  }

  // 잔여 휴가 조회
  const hasDays = await getUserDayoffCount(id, dayjs().year());

  // 휴가 생성
  const dayoffPayload = {
    userId: id,
    year: dayjs().year(),
    startDate: new Date(today),
    endDate: new Date(today),
    type: DayoffType.Published,
    status: "Approved",
    reason: "관리자의 연차 발급",
    days,
    restDays: hasDays + days,
  };

  const result = await create(dayoffPayload);
  if (result) {
    return res.status(201).json({
      ok: true,
      message: "연차 부여 성공",
    });
  }
};
