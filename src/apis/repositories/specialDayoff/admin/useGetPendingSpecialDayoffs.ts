import { useQuery } from "@tanstack/react-query";
import * as specialDayoff from "@apis/specialDayoff";
import { CoreQueryData } from "@typings/common/core.type";
import { ClientPendingDayoff } from "@apis/repositories/dayoff/admin/useGetPendingStatus";
import dayjs from "dayjs";
import { covertToKoreanValue } from "../ticket/useGetTickets";

export const useGetPendingSpecialDayoffs = () => {
  const queryFn = async (): Promise<
    CoreQueryData<specialDayoff.SpecialDayoff[]>
  > => {
    const { data } = await specialDayoff.api.admin.get.specialDayoffs();
    console.log(data);
    return data;
  };

  const { data, ...rest } = useQuery({
    queryKey: specialDayoff.dayoffQueryKeys.pendingSpecialDayoffs,
    queryFn,
  });

  const pendingSepcialDayoffs: ClientPendingDayoff[] = data
    ? data?.result.map((el) => ({
        id: el.id,
        category: covertToKoreanValue(el.category),
        createAt: dayjs(el.createAt).format("YYYY-MM-DD HH:mm:ss"),
        name: el.user.name,
      }))
    : [];

  return { pendingSepcialDayoffs, ...rest };
};
