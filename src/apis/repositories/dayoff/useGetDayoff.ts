import { apis } from "@apis/axios/instance";
import { Dayoff } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { CoreQueryData } from "@typings/common/core.type";

export const useGetDayoff = (dayoffId?: string) => {
  const queryFn = async (): Promise<CoreQueryData<Dayoff>> => {
    const { data } = await apis.get(`/dayoffs/${dayoffId}`);
    return data;
  };

  const { data, ...rest } = useQuery({
    queryKey: ["GET_DAYOFF", dayoffId],
    queryFn,
    enabled: !!dayoffId,
  });

  return {
    data: data?.result,
    ...rest,
  };
};
