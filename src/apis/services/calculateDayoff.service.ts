import { useCalculateDayoff } from "@apis/repositories/dayoff/useCalculateDayoff";

type CalculateDayoffParams = {
  startDate: string;
  endDate: string;
};

export const useCalculateDayoffService = (params: CalculateDayoffParams) => {
  const { data, isLoading } = useCalculateDayoff(params);

  const dayoffStatus = data?.result;
  return { dayoffStatus, dayoffStatusIsLoading: isLoading };
};
