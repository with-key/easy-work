import { apis } from "@apis/axios/instance";
import { dayoffCategoryBuilder } from "@libs/client/dayoff";
import { DayoffCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export type ClientPendingDayoff = {
  id: number;
  category?: string;
  createAt: string;
  name: string;
};

type PendingStatus = {
  ok: boolean;
  message: string;
  result: {
    id: number;
    category: DayoffCategory;
    createAt: string;
    user: {
      name: string;
    };
  }[];
};

export const useGetPendingStatus = () => {
  const queryFn = async (): Promise<PendingStatus> => {
    const { data } = await apis.get("/admin/dayoffs/pending-status");
    return data;
  };

  const { data, ...rest } = useQuery({
    queryKey: ["dayoff", "pending-status"],
    queryFn,
  });

  const pendings = data?.result.map((pending) => ({
    id: pending.id,
    category: dayoffCategoryBuilder(pending.category),
    createAt: dayjs(pending.createAt).format("YYYY-MM-DD HH:mm:ss"),
    name: pending.user.name,
  }));

  return { pendings, ...rest };
};
