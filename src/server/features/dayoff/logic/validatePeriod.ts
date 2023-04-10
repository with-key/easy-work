import dayjs from "dayjs";

// 연차 휴가기간 검증: 종료일이 시작일보다 빠르면 false
export const validatePeriodFull = (startDate: Date, endDate: Date): boolean => {
  // 종료일이 시작일보다 빠르면 true
  if (dayjs(endDate).isBefore(startDate, "day")) return true;
  return false;
};

// 반차 휴가기간 검증: 시작일과 종료일이 같지 않으면 false
export const validatePeriodHalf = (start: Date, end: Date): boolean => {
  if (!dayjs(start).isSame(end, "day")) return true;
  return false;
};
