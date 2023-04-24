import { Dayoff, DayoffCategory } from "@prisma/client";

export type GoDayoffPayload = {
  id?: string;
  category: DayoffCategory;
  startDate: Date;
  endDate: Date;
  reason: string;
  startDateAt: "PM" | "AM";
  endDateAt: "AM" | "PM";
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
