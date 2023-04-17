import dayjs from "dayjs";

import { apis } from "@apis/axios/instance";
import { usersQueryKeys } from "@apis/keys/dayoff";
import { useQuery } from "@tanstack/react-query";
import { CoreQueryData } from "@typings/common/core.type";

export type DayoffStatusUser = {
  id: number;
  nickname: string;
  joinDay: Date;
  avatar: string;
  days: number;
};

export type ClientDayoffStuatusUser = {
  id: number;
  nickname: string;
  joinDay: string;
  avatar: string;
  days: number;
};

export const useGetUsersStatus = () => {
  const queryFn = async (): Promise<CoreQueryData<DayoffStatusUser[]>> => {
    const { data } = await apis.get("/admin/users");
    return data;
  };

  const { data, ...rest } = useQuery({
    queryKey: usersQueryKeys.users,
    queryFn,
  });

  // 연차 현황 유저 리스트
  const users = data?.result.map((user) => ({
    ...user,
    joinDay: dayjs(user.joinDay).format("YYYY-MM-DD"),
  }));

  return { users, ...rest };
};
