import { apis } from "@apis/axios/instance";
import { useAppRouter } from "@hooks/useAppRouter";
import { Status } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Paylaod = {
  status: Status;
};

export const useAlterDayoffStatus = () => {
  const router = useAppRouter();
  const queryClient = useQueryClient();

  const { mutate, reset, ...rest } = useMutation({
    mutationFn: async (paylod: Paylaod) => {
      const { data } = await apis.put(`/admin/dayoffs/${router.query.id}`, {
        status: paylod.status,
      });

      return data;
    },
  });

  const invalidateDayoff = () => {
    // reset
    reset();

    // qeury invalidation
    queryClient.invalidateQueries({
      queryKey: [
        "dayoff",
        "pending-detail",
        {
          id: router.query.id,
        },
      ],
    });
  };

  return {
    alterDayoffStaus: mutate,
    invalidateDayoff,
    ...rest,
  };
};
