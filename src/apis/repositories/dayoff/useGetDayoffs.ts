import { apis } from "@apis/axios/instance";
import { useQuery } from "@tanstack/react-query";

import type { DayoffsReponse } from "@typings/dayoff/dayoff.type";

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

  return {
    isLoading,
    status,
    data,
  };
};
