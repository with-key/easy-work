import { apis } from "@apis/axios/instance";
import { useQuery } from "@tanstack/react-query";

import { convertClientDayoff } from "@libs/client/dayoff";
import type { DayoffsReponse } from "@typings/dayoff/dayoff.type";

export const useGetDayoffs = (year: number) => {
  const queryFn = async (): Promise<DayoffsReponse> => {
    const { data } = await apis.get("/dayoffs", {
      params: {
        target: "user",
        year,
      },
    });

    return data;
  };

  const { data, ...rest } = useQuery({
    queryKey: ["GET_DAYOFFS", "user", { year }],
    queryFn,
  });

  const dayoffs = data?.result.map(convertClientDayoff);

  console.log(dayoffs);

  return {
    dayoffs,
    ...rest,
  };
};
