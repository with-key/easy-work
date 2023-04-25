import { DayoffType } from "@prisma/client";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

import { validatePeriodFull } from "../logic/validatePeriod";
import { checkOverlapPeriod } from "../logic/checkOverlapPeriod";
import { calculateDays } from "../logic/calculateDays";

import { GoDayoffBody, GoDayoffInputDto } from "../dtos/goDayoff";

import dayoffRepository from "../repositories/dayoffs.repository";
import db from "@libs/server/db";

// 사용자의 휴가 사용
export const goDayoffService = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { create, getUserDayoffCount } = dayoffRepository();
  const { startDate, endDate, reason, startDateAt, endDateAt } =
    req.body as GoDayoffBody;

  const userId = req.session.user?.id;
  const dayoffId = req.body.id;

  // 휴가기간 유효성 검증 (시작일과 종료일 유효성 검증)
  const isError = validatePeriodFull(startDate, endDate);
  if (isError)
    return res.status(404).json({
      ok: false,
      message: "휴가 종료일이 시작일보다 빠를 수 없습니다.",
    });

  // 휴가기간 유효성 검증 (기신청된 휴가와 겹침여부 확인)
  const isErrorOverlap = await checkOverlapPeriod({
    userId,
    startDate,
    endDate,
  });
  if (isErrorOverlap) {
    return res.status(404).json({
      ok: false,
      message: "이미 신청된 휴가가 존재합니다.",
    });
  }

  // 사용자의 잔여 휴가 갯수 조회
  const hasDays = await getUserDayoffCount(userId, dayjs().year());

  const { days } = await calculateDays(
    startDate,
    endDate,
    startDateAt,
    endDateAt
  );

  const payloadDayoff: GoDayoffInputDto = {
    year: dayjs(startDate).year(),
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    type: DayoffType.Used,
    reason,
    days: -days,
    userId,
    restDays: hasDays - days,
  };

  // dayoffId 가 있다면 수정
  if (dayoffId) {
    const result = await db.dayoff.update({
      where: {
        id: Number(dayoffId),
      },
      data: payloadDayoff,
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      ok: true,
      message: `휴가를 수정했습니다.`,
      result,
    });
  }

  await create(payloadDayoff);
  return res.status(201).json({
    ok: true,
    message: "휴가가 신청완료되었습니다.",
  });
};
