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

export type ClientDayoffResponse = {
  id?: number;
  createAt: string;
  startDate: string;
  endDate: string;
  days?: number;
  reason?: string;
  status?: string;
  category?: string;
};
