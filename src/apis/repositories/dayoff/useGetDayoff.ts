import { apis } from "@apis/axios/instance";
import { Dayoff } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetDayoff = (dayoffId?: string) => {
  const queryFn = async (): Promise<Dayoff> => {
    const { data } = await apis.get(`/dayoffs/${dayoffId}`);
    const [dayoff] = data.dayoff;
    return dayoff;
  };

  return useQuery({
    queryKey: ["GET_DAYOFF", dayoffId],
    queryFn,
    enabled: !!dayoffId,
  });
};
