import { apis } from "@apis/axios/instance";
import { useQuery } from "@tanstack/react-query";

import { convertClientDayoff } from "@libs/client/dayoff";
import type { DayoffsReponse } from "@typings/dayoff/dayoff.type";
import { useAppRouter } from "@hooks/useAppRouter";

export const useGetDayoffsByUser = (year: number) => {
  const { query, isReady } = useAppRouter();
  const userId = query.id?.toString();

  const queryFn = async (): Promise<DayoffsReponse> => {
    const { data } = await apis.get("/dayoffs", {
      params: {
        target: "admin",
        year,
        userId,
      },
    });

    return data;
  };

  const { data, isLoading, ...rest } = useQuery({
    queryKey: ["GET_DAYOFFS", "admin", { year, userId }],
    queryFn,
    enabled: isReady,
  });

  const userDayoffs = data?.result.map(convertClientDayoff);
  const loading = isLoading || !userDayoffs;

  return {
    userDayoffs,
    loading,
    ...rest,
  };
};
