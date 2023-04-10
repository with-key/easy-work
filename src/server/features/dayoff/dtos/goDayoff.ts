import { Dayoff, DayoffCategory } from "@prisma/client";

export type GoDayoffBody = {
  category: DayoffCategory;
  startDate: Date;
  endDate: Date;
  reason: string;
};

export type GoDayoffInputDto = Pick<
  Dayoff,
  | "category"
  | "reason"
  | "startDate"
  | "endDate"
  | "days"
  | "type"
  | "userId"
  | "year"
>;
