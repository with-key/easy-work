import { apis } from "@apis/axios/instance";
import { dayoffQueryKeys } from "@apis/keys/dayoff";
import { useAppRouter } from "@hooks/useAppRouter";
import { Dayoff, DayoffType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { CoreQueryData } from "@typings/common/core.type";

type Response = CoreQueryData<
  {
    type: DayoffType;
    days: number;
  }[]
>;

// 유저의 휴가 휴가 현황 조회
export const useGetUserDayoffStatus = (year: number) => {
  const router = useAppRouter();

  const queryFn = async (): Promise<Response> => {
    const { data } = await apis.get(`/admin/dayoffs/created-status`, {
      params: {
        id: router.query.id,
        year,
      },
    });

    return data;
  };

  const { data, ...rest } = useQuery({
    queryKey: dayoffQueryKeys.useDayoffStatus(
      router.query.id?.toString(),
      year
    ),
    queryFn,
    enabled: router.isReady,
  });

  const dayoffStatus = data?.result.map((el) => ({
    ...el,
    type: dayoffTypeBuilder(el.type),
  }));

  const restDays = dayoffStatus?.reduce((acc, cur) => acc + cur.days, 0);

  return { dayoffStatus, restDays, ...rest };
};

function dayoffTypeBuilder(dayoffType: DayoffType) {
  switch (dayoffType) {
    case "Gone":
      return "소멸";
    case "Passed":
      return "이월";
    case "Published":
      return "발행";
    case "Used":
      return "사용";
    default:
      throw new Error("잘못된 휴가 타입입니다.");
  }
}
