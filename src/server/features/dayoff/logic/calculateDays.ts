import { includes, map, pipe, range, reject, toArray } from "@fxts/core";
import dayjs from "dayjs";
import db from "@libs/server/db";

type Day = "AM" | "PM";

// 특정 날짜가 공휴일에 포함되는지 검증한다.
const includeAtHoliday = (date: Date, holidayPeriod: string[]): boolean => {
  const target = dayjs(date).format("YYYY-MM-DD");

  if (dayjs(target).day() === 0 || dayjs(target).day() === 6) {
    return true;
  }

  return includes(target, holidayPeriod);
};

// 휴가기간과 실제 차감일을 각각 산출한다.
const getAdditionalDays = (
  startFrom: Day,
  endTo: Day,
  isStartHoli: boolean,
  isEndHoli: boolean
) => {
  const startFromToNumber = isStartHoli ? 0 : startFrom === "AM" ? 0 : -0.5;
  const endToToNumber = isEndHoli ? 0 : endTo === "AM" ? -0.5 : 0;
  return startFromToNumber + endToToNumber;
};

export const calculateDays = async (
  startDate: Date,
  endDate: Date,
  startFrom: Day,
  endTo: Day
) => {
  // 휴가가 포함되는 날짜의 갯수
  const periodCount = dayjs(endDate).diff(startDate, "day") + 1;

  // 공휴일 조회 및 배열로 변환
  const holidayPeriod = await pipe(
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

  const isStartHoli = includeAtHoliday(startDate, holidayPeriod);
  const isEndHoli = includeAtHoliday(endDate, holidayPeriod);

  // 휴가기간 중 공휴일 제외
  const period = pipe(
    range(periodCount), // 휴가기간만큼 반복
    map((day) => dayjs(startDate).add(day, "day").format("YYYY-MM-DD")), //
    reject((day) => dayjs(day).day() === 0), // 일요일
    reject((day) => dayjs(day).day() === 6), // 토요일
    reject((day) => includes(day, holidayPeriod)), // 공휴일
    toArray
  );

  const days =
    period.length + getAdditionalDays(startFrom, endTo, isStartHoli, isEndHoli);

  return {
    period, // 휴가기간
    days, // 실제 차감일
  };
};
