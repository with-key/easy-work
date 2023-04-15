import { useMutation } from "@tanstack/react-query";
import { apis } from "@apis/axios/instance";
import { useAppRouter } from "@hooks/useAppRouter";

export const useDeleteDayoff = () => {
  const router = useAppRouter();

  const mutationFn = async () => {
    const { data } = await apis.delete(`/dayoffs/${router.query.id}`);
    return data;
  };

  const { mutate, ...rest } = useMutation({
    mutationFn,
  });

  return {
    deleteDayoff: mutate,
    ...rest,
  };
};
