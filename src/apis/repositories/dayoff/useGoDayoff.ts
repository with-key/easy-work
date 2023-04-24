import { apis } from "@apis/axios/instance";
import { useMutation } from "@tanstack/react-query";
import { GoDayoffPayload } from "@typings/dayoff/dayoff.type";
import { AxiosError } from "axios";

export const useGoDayoff = () => {
  const mutationFn = async (payload: GoDayoffPayload) => {
    const { data } = await apis.post("/dayoffs/go-dayoff", payload);
    return data;
  };

  const { mutate, error, ...rest } = useMutation({
    mutationFn,
  });

  const dayoffError: {
    message: string;
    ok: boolean;
  } = error instanceof AxiosError && error?.response?.data;

  return {
    mutate,
    error: dayoffError,
    ...rest,
  };
};
