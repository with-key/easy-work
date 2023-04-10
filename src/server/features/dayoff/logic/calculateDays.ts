import { includes, map, pipe, range, reject, toArray } from "@fxts/core";
import { DayoffCategory } from "@prisma/client";
import dayjs from "dayjs";
import db from "@libs/server/db";

export const calculateDays = async (
  startDate: Date,
  endDate: Date,
  category: DayoffCategory
) => {
  if (category !== "Full") {
    return { days: -0.5 };
  }

  const diffDays = dayjs(endDate).diff(startDate, "day") + 1;

  // 공휴일 조회 및 배열로 변환
  const holidays = await pipe(
    db.holiday.findMany({
      where: {
        year: dayjs(startDate).format("YYYY"),
        month: dayjs(startDate).format("MM"),
      },
      select: {
        date: true,
      },
    }),
    map((el) => dayjs(el.date).format("YYYY-MM-DD")),
    toArray
  );

  // 휴가기간 중 공휴일 제외
  const result = pipe(
    range(diffDays), // 휴가기간만큼 반복
    map((day) => dayjs(startDate).add(day, "day").format("YYYY-MM-DD")), //
    reject((day) => dayjs(day).day() === 0), // 일요일
    reject((day) => dayjs(day).day() === 6), // 토요일
    reject((day) => includes(day, holidays)), // 공휴일
    toArray
  );

  return {
    days: -result.length,
  };
};
