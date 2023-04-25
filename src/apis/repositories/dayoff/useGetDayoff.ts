import { apis } from "@apis/axios/instance";
import { useAppRouter } from "@hooks/useAppRouter";
import { dayoffStatusBuilder } from "@libs/client/dayoff";
import { Dayoff } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { CoreQueryData } from "@typings/common/core.type";
import { ClientDayoffResponse } from "@typings/dayoff/dayoff.type";
import dayjs from "dayjs";

// 사용자의 휴가내역 상세 조회
export const useGetDayoff = () => {
  const router = useAppRouter();
  const dayoffId = router.query.id?.toString();

  const queryFn = async (): Promise<CoreQueryData<Dayoff>> => {
    const { data } = await apis.get(`/dayoffs/${dayoffId}`);
    return data;
  };

  const { data, ...rest } = useQuery({
    queryKey: ["GET_DAYOFF", { dayoffId }],
    queryFn,
    enabled: !!dayoffId,
  });

  const dayoff: Partial<ClientDayoffResponse> = {
    ...data?.result,
    createAt: dayjs(data?.result?.createAt).format("YYYY.MM.DD HH:mm:ss"),
    startDate: dayjs(data?.result?.startDate).format("YYYY.MM.DD"),
    endDate: dayjs(data?.result?.startDate).format("YYYY.MM.DD"),
    days: data?.result?.days,
    reason: data?.result?.reason,
    status: dayoffStatusBuilder(data?.result?.status),
    restDays: data?.result?.restDays,
  };

  return {
    dayoff,
    ...rest,
  };
};
