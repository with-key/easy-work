import { includes, map, pipe, range, reject, toArray } from "@fxts/core";
import dayjs from "dayjs";
import db from "@libs/server/db";

type Day = "AM" | "PM";

// 휴가기간과 실제 차감일을 각각 산출한다.
const getAdditionalDays = (startFrom: Day, endTo: Day) => {
  if (startFrom === "AM" && endTo === "PM") {
    return 0;
  }

  if (startFrom === "AM" && endTo === "AM") {
    return -0.5;
  }

  if (startFrom === "PM" && endTo === "PM") {
    return -0.5;
  }

  // 오후부터 다음 날 오전까지
  if (startFrom === "PM" && endTo === "AM") {
    return -1;
  }

  throw Error("startDate or endDate is undefined");
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

  // 휴가기간 중 공휴일 제외
  const period = pipe(
    range(periodCount), // 휴가기간만큼 반복
    map((day) => dayjs(startDate).add(day, "day").format("YYYY-MM-DD")), //
    reject((day) => dayjs(day).day() === 0), // 일요일
    reject((day) => dayjs(day).day() === 6), // 토요일
    reject((day) => includes(day, holidayPeriod)), // 공휴일
    toArray
  );

  const days = period.length + getAdditionalDays(startFrom, endTo);

  return {
    period, // 휴가기간
    days, // 실제 차감일
  };
};
