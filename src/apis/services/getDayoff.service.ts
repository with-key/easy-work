import { useAppRouter } from "@hooks/useAppRouter";
import { useGetDayoff } from "@apis/repositories/dayoff/useGetDayoff";
import dayjs from "dayjs";

import {
  dayoffCategoryBuilder,
  dayoffStatusBuilder,
} from "@libs/client/dayoff";

export type ClientDayoff = {
  id?: number;
  createAt: string;
  startDate: string;
  endDate: string;
  days?: number;
  reason?: string;
  status?: string;
  category?: string;
};

export const useGetDayoffService = () => {
  const { id } = useAppRouter();
  const { data, ...rest } = useGetDayoff(id);

  // utils
  const dayoff: ClientDayoff = {
    ...data,
    createAt: dayjs(data?.createAt).format("YYYY.MM.DD HH:mm:ss"),
    startDate: dayjs(data?.startDate).format("YYYY.MM.DD"),
    endDate: dayjs(data?.startDate).format("YYYY.MM.DD"),
    days: data?.days,
    reason: data?.reason,
    status: dayoffStatusBuilder(data?.status),
    category: dayoffCategoryBuilder(data?.category),
  };

  return { dayoff, ...rest };
};
