import { Dayoff } from "@prisma/client";

export type GoDayoffBody = {
  startDate: Date;
  endDate: Date;
  reason: string;
  startDateAt: "AM" | "PM";
  endDateAt: "AM" | "PM";
};

export type GoDayoffInputDto = Pick<
  Dayoff,
  | "reason"
  | "startDate"
  | "endDate"
  | "days"
  | "type"
  | "userId"
  | "year"
  | "restDays"
>;
