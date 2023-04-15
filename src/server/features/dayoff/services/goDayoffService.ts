import { DayoffType } from "@prisma/client";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import {
  validatePeriodFull,
  validatePeriodHalf,
} from "../logic/validatePeriod";

import { checkOverlapPeriod } from "../logic/checkOverlapPeriod";
import { calculateDays } from "../logic/calculateDays";
import { GoDayoffBody, GoDayoffInputDto } from "../dtos/goDayoff";

import * as dayoffRepository from "../repositories/dayoffs.repository";
import db from "@libs/server/db";

export const goDayoffService = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { category, startDate, endDate, reason } = req.body as GoDayoffBody;

  const userId = req.session.user?.id;
  const dayoffId = req.body.id;

  // 휴가기간 유효성 검증 (시작일과 종료일 유효성 검증)
  if (category === "Full") {
    const isError = validatePeriodFull(startDate, endDate);
    if (isError)
      return res.status(404).json({
        ok: false,
        message: "휴가 종료일이 시작일보다 빠를 수 없습니다.",
      });
  }

  // 반차는 시작일과 종료일이 같아야함
  if (category !== "Full") {
    const isError = validatePeriodHalf(startDate, endDate);
    if (isError) {
      return res.status(404).json({
        ok: false,
        message: "반차는 반드시 시작일과 종료일이 같아야합니다.",
      });
    }
  }

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

  // 휴가 days 산출, 반차는 -0.5
  const { days } = await calculateDays(startDate, endDate, category);

  const payloadDayoff: GoDayoffInputDto = {
    year: dayjs(startDate).year(),
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    type: DayoffType.Used,
    reason,
    days,
    category,
    userId,
  };

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

  await dayoffRepository.create(payloadDayoff);

  return res.status(201).json({
    ok: true,
    message: "휴가가 신청완료되었습니다.",
  });
};
