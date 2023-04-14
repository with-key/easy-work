import { Dayoff, DayoffCategory } from "@prisma/client";

export type CreateDayoffPayload = {
  category: DayoffCategory;
  startDate: Date;
  endDate: Date;
  reason: string;
};

export type DayoffsReponse = {
  ok: boolean;
  message: string;
  result: Dayoff[];
};
