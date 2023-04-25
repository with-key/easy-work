import { Dayoff } from "@prisma/client";

export type GoDayoffPayload = {
  id?: string;
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
  id: number;
  days: number;
  reason: string;
  status: string;
  restDays: number;
  createAt: string;
  startDate: string;
  endDate: string;
};
