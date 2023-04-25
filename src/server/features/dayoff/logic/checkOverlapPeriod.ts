import { isEmpty } from "@fxts/core";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

import dayoffRepository from "../repositories/dayoffs.repository";

type CheckOverlapPeriod = {
  startDate: Date;
  endDate: Date;
  userId: number;
};

// 휴가기간 유효성 검증 (기신청된 휴가와 겹침여부 확인)
export const checkOverlapPeriod = async ({
  userId,
  startDate,
  endDate,
}: CheckOverlapPeriod) => {
  const thisYear = dayjs(startDate).year();
  const { getUserAllDayoff } = dayoffRepository();

  // 해당 유저의 당해년도 휴가 전원 조회
  const dayoffs = await getUserAllDayoff(userId, thisYear);

  if (isEmpty(dayoffs)) return false;
  for (const dayoff of dayoffs) {
    const { startDate: pastStartDate, endDate: pastEndDate } = dayoff;

    // 겹치는 경우 확인
    const isOverlap =
      dayjs(startDate).isSameOrBefore(pastEndDate, "day") &&
      dayjs(pastStartDate).isSameOrBefore(endDate, "day");

    if (isOverlap) return true;
  }

  return false;
};
