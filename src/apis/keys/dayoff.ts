import { CalculateDayoffPaylod } from "@apis/repositories/dayoff/useCalculateDayoff";

export const dayoffQueryKeys = {
  dayoffs: ["dayoffs"], // 휴가 목록 조회
  dayoff: (id: string | undefined) => ["dayoffs", { id }], // 휴가 상세 조회
  calculateDayoff: (payload: CalculateDayoffPaylod) => ["dayoffs", { payload }], // 휴가 계산
};

export const usersQueryKeys = {
  users: ["users", "userStatus"],
};
