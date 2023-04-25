import { Dayoff, DayoffCategory, Status } from "@prisma/client";
import { ClientDayoffResponse } from "@typings/dayoff/dayoff.type";
import dayjs from "dayjs";

// dayoff get value
export function dayoffStatusBuilder(value?: Status) {
  switch (value) {
    case "Approved":
      return "승인";
    case "Pending":
      return "대기";
    case "Rejected":
      return "반려";
    default:
      break;
  }
}

export function convertClientDayoff(
  dayoff: Dayoff
): Partial<ClientDayoffResponse> {
  return {
    ...dayoff,
    status: dayoffStatusBuilder(dayoff.status),
    createAt: dayjs(dayoff.createAt).format("YYYY.MM.DD HH:mm:ss"),
    startDate: dayjs(dayoff.startDate).format("YY.MM.DD"),
    endDate: dayjs(dayoff.endDate).format("YY.MM.DD"),
  };
}
