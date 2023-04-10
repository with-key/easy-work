import db from "@libs/server/db";
import { GoDayoffInputDto } from "../dtos/goDayoff";

// 휴가 신청
export const create = (paylaod: GoDayoffInputDto) =>
  db.dayoff.create({
    data: paylaod,
  });

// session 유저의 모든 휴가 조회
export const getUserAllDayoff = (userId: number, year: number) =>
  db.dayoff.findMany({
    where: {
      userId,
      AND: {
        year, // 해당 년도만 조회
        status: "Approved", // 승인된 휴가만 조회
        type: "Used", // "사용" 휴가만 조회
      },
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
    },
  });
