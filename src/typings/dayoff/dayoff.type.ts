import { DayoffType } from "@prisma/client";

export type CreateDayoffPayload = {
  startDate: string;
  endDate: string;
  reason: string;
};
