import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { useAppRouter } from "@hooks/useAppRouter";

import { apis } from "@apis/axios/instance";
import { dayoffStatusBuilder } from "@libs/client/dayoff";

import type { ClientDayoffResponse } from "@typings/dayoff/dayoff.type";
import type { Dayoff } from "@prisma/client";
import { CoreQueryData } from "@typings/common/core.type";

type Response = CoreQueryData<Dayoff>;

export const useGetPendingStatusId = () => {
  const router = useAppRouter();
  const queryFn = async (): Promise<Response> => {
    const { data } = await apis.get(
      `/admin/dayoffs/pending-status/${router.query.id}`
    );
    return data;
  };

  const { data, ...rest } = useQuery({
    queryKey: ["dayoff", "pending-detail", { id: router.query.id }],
    queryFn,
    enabled: router.isReady,
  });

  const result = data?.result;

  const pendingDayoff: Partial<ClientDayoffResponse> = {
    ...data,
    createAt: dayjs(result?.createAt).format("YYYY.MM.DD HH:mm:ss"),
    startDate: dayjs(result?.startDate).format("YYYY.MM.DD"),
    endDate: dayjs(result?.startDate).format("YYYY.MM.DD"),
    days: result?.days,
    reason: result?.reason,
    status: dayoffStatusBuilder(result?.status),
  };

  return { pendingDayoff, ...rest };
};
