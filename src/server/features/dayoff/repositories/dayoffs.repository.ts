import db from "@libs/server/db";
import { GoDayoffInputDto } from "../dtos/goDayoff";
import { DayoffType } from "@prisma/client";
import { pipe, reduce, toArray, toAsync } from "@fxts/core";

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

const dayoffRepository = () => {
  const dayoff = db.dayoff;
  // 휴가 신청
  const create = (paylaod: GoDayoffInputDto) =>
    db.dayoff.create({
      data: paylaod,
    });

  // session 유저의 모든 휴가 조회
  const getUserAllDayoff = (userId: number, year: number) =>
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

  // 특정 유저의 사용가능한 dayoff count 조회
  const getUserDayoffCount = async (userId: number, year: number) => {
    // available days
    const getDayoffSumEachType = ({
      userId,
      year,
      type,
    }: {
      userId: number;
      year: number;
      type: DayoffType;
    }) => {
      return dayoff.aggregate({
        where: {
          userId,
          year,
          type,
        },
        _sum: {
          days: true,
        },
      });
    };

    // 모든 타입의 days 합계를 구하고, type, days를 가진 배열을 생성한다.
    const getDayoffSumAllTypes = Object.keys(DayoffType).map(async (type) => {
      const daysCount = await getDayoffSumEachType({
        userId,
        type: type as keyof typeof DayoffType,
        year: 2023,
      });

      return {
        type,
        days: daysCount._sum.days ?? 0,
      };
    });

    const ResolvedArray = await pipe(getDayoffSumAllTypes, toAsync, toArray);
    const result = reduce((acc, cur) => acc + cur.days, 0, ResolvedArray);
    return result;
  };

  return { dayoff, create, getUserAllDayoff, getUserDayoffCount };
};

export default dayoffRepository;
