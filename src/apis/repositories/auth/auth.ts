import { apis } from "@apis/axios/instance";
import { useMutation } from "@tanstack/react-query";
import { User } from "@typings/user/user.type";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (user: User) => {
      const data = await apis.post("/register", user);
    },
  });
};
