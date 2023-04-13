import { apis } from "@apis/axios/instance";
import { useMutation, useQuery } from "@tanstack/react-query";

type CalculateDayoffParams = {
  startDate: string;
  endDate: string;
};

export const useCalculateDayoff = (params: CalculateDayoffParams) => {
  const queryFn = async (): Promise<{
    ok: boolean;
    result: { count: number; hasDays: number };
    message: string;
  }> => {
    const { data } = await apis.get("/dayoffs/calculate-dayoff", {
      params,
    });

    return data;
  };

  return useQuery({
    queryKey: ["calculate-dayoff", params],
    queryFn,
  });
};
