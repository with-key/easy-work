import { DayoffCategory } from "@prisma/client";

export type CreateDayoffPayload = {
  category: DayoffCategory;
  startDate: string;
  endDate: string;
  reason: string;
};
