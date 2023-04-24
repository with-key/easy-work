import { useMutation } from "@tanstack/react-query";
import * as specialDayoff from "@apis/specialDayoff";

export const useGoSpeicalDayoff = () => {
  const { mutate } = useMutation({
    mutationFn: async (payload: specialDayoff.AddSpecialDayoffPayload) => {
      return specialDayoff.api.add(payload);
    },
  });

  return {
    goSpecialDayoff: mutate,
  };
};
