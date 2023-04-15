import { apis } from "@apis/axios/instance";
import { useAppRouter } from "@hooks/useAppRouter";
import { useMutation } from "@tanstack/react-query";

type UpdateDayoffPayload = {
  id: number;
};

export const useEditDayoff = () => {
  const router = useAppRouter();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (payload: UpdateDayoffPayload) => {
      const { data } = await apis.put(`/dayoffs/${router.query.id}`, payload);
      return data;
    },
  });

  return {
    editDayoff: mutate,
    ...rest,
  };
};
