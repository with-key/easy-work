import { DayoffCategory } from "@prisma/client";

export type CreateDayoffPayload = {
  category: DayoffCategory;
  startDate: Date;
  endDate: Date;
  reason: string;
};
