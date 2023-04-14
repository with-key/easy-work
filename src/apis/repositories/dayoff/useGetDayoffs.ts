import { apis } from "@apis/axios/instance";
import {
  dayoffCategoryBuilder,
  dayoffStatusBuilder,
} from "@libs/client/dayoff";
import { useQuery } from "@tanstack/react-query";

import type { DayoffsReponse } from "@typings/dayoff/dayoff.type";
import dayjs from "dayjs";

export const useGetDayoffs = (year: number) => {
  const queryFn = async (): Promise<DayoffsReponse> => {
    const { data } = await apis.get("/dayoffs", {
      params: {
        year,
      },
    });

    return data;
  };

  const { data, isLoading, status } = useQuery({
    queryKey: ["GET_DAYOFFS", { year }],
    queryFn,
  });

  const dayoffs = data?.result.map((dayoff) => ({
    ...dayoff,
    category: dayoffCategoryBuilder(dayoff.category),
    status: dayoffStatusBuilder(dayoff.status),
    createAt: dayjs(dayoff.createAt).format("YYYY.MM.DD HH:mm:ss"),
    startDate: dayjs(dayoff.startDate).format("YY.MM.DD"),
    endDate: dayjs(dayoff.endDate).format("YY.MM.DD"),
  }));

  return {
    isLoading,
    status,
    dayoffs,
  };
};
