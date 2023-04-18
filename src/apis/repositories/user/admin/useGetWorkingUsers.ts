import { apis } from "@apis/axios/instance";
import { usersQueryKeys } from "@apis/keys/dayoff";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { CoreQueryData } from "@typings/common/core.type";

// 현재 재직중인 사용자 목록을 가져옵니다.
export const useGetWorkingUsers = () => {
  const queryFn = async (): Promise<CoreQueryData<User[]>> => {
    const { data } = await apis.get("/admin/users/working-users");
    return data;
  };

  const { data, ...rest } = useQuery({
    queryKey: usersQueryKeys.workingUsers,
    queryFn,
  });

  const users = data?.result;

  return { users, ...rest };
};
