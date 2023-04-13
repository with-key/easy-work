import { useAppRouter } from "@hooks/useAppRouter";
import { useGetDayoff } from "@apis/repositories/dayoff/useGetDayoff";
import dayjs from "dayjs";
import { DayoffCategory, Status } from "@prisma/client";

type Dayoff = {
  id: number;
  createAt: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: string;
  category: string;
};

export const useGetDayoffService = () => {
  const { id } = useAppRouter();
  const { data, ...rest } = useGetDayoff(id);

  // utils
  const dayoff: Partial<Dayoff> = {
    ...data,
    createAt: dayjs(data?.createAt).format("YYYY.MM.DD HH:mm:ss"),
    startDate: dayjs(data?.startDate).format("YYYY.MM.DD"),
    endDate: dayjs(data?.startDate).format("YYYY.MM.DD"),
    days: data?.days,
    reason: data?.reason,
    status: labelBuilder(data?.status),
    category: genDayoffCatrgory(data?.category),
  };

  return { dayoff, ...rest };
};

// dayoff get value
function labelBuilder(value?: Status) {
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

function genDayoffCatrgory(value?: DayoffCategory) {
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
}
