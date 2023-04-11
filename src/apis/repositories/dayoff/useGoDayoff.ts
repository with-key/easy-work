import { apis } from "@apis/axios/instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDayoffPayload } from "@typings/dayoff/dayoff.type";

/**
 * @doc 휴가 사용하기
 *
 */

export const useGoDayoff = () => {
  const mutationFn = async (payload: CreateDayoffPayload) => {
    const data = await apis.post("/dayoffs/go-dayoff", payload);
    console.log(data);
  };

  const { mutate } = useMutation({
    mutationFn,
  });

  // const queryClient = useQueryClient();

  return {
    mutate,
  };
};
