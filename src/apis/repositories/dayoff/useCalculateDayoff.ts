import { useQuery } from "@tanstack/react-query";
import { apis } from "@apis/axios/instance";
import { CoreQueryData } from "@typings/common/core.type";
import { dayoffQueryKeys } from "@apis/keys/dayoff";

export type CalculateDayoffPaylod = {
  startDate: string;
  endDate: string;
  startDateAt: "AM" | "PM";
  endDateAt: "AM" | "PM";
};

export const useCalculateDayoff = (payload: CalculateDayoffPaylod) => {
  const queryFn = async (): Promise<
    CoreQueryData<{ days: number; hasDays: number }>
  > => {
    const { data } = await apis.get("/dayoffs/calculate-dayoff", {
      params: payload,
    });

    console.log(data);

    return data;
  };

  return useQuery({
    queryKey: dayoffQueryKeys.calculateDayoff(payload),
    queryFn,
  });
};
