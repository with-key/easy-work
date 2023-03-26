import { DayoffCategory, Status } from "@prisma/client";

export const genDayoffCatrgory = (value: DayoffCategory) => {
  switch (value) {
    case "AmHalf":
      return "오전 반차";
    case "PmHalf":
      return "오후 반차";
    case "Full":
      return "연차";
    default:
      break;
  }
};

export const genDayoffStatus = (value: Status) => {
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
};
