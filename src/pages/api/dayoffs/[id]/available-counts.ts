import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import { DayoffType } from "@prisma/client";
import { pipe, toAsync, toArray, reduce } from "@fxts/core";

type Query = { year: string };
type Params = {
  userId?: number;
  year: number;
  type?: DayoffType;
};

/**
 *
 *
 */
const getDayoffCountByType = ({ userId, year, type }: Params) => {
  return db.dayoff.count({
    where: {
      userId,
      year,
      type: type,
    },
  });
};

/**
 * 특정 유저의 잔혀 휴가 갯수 조회
 *
 */

type GetDayoffByIdQuery = {
  userId?: number;
  year: number;
};

const getDayoffListById = ({ userId, year }: GetDayoffByIdQuery) => {
  return db.dayoff.findMany({
    where: {
      userId,
      year,
      type: {
        in: ["Used", "Gone"],
      },
    },
    select: {
      id: true,
      days: true,
      startDate: true,
      endDate: true,
      year: true,
      reason: true,
      type: true,
      category: true,
      status: true,
      userId: true,
    },
  });
};

// const getUserDayoffDays = ({ userId, year }: Params) =>
//   [
//     DayoffType.Gone,
//     DayoffType.Passed,
//     DayoffType.Published,
//     DayoffType.Used,
//   ].map((el) => getDayoffByType({ userId, year, type: el }));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as Query; // query
  const year = +query.year;

  const userId = req.session.user?.id; // 세션 아이디

  if (req.method === "GET") {
    const dayoffList = await getDayoffListById({ userId, year });

    // const dayoffCount = await getDayoffCountByType({
    //   userId,
    //   year: 2023,
    //   type: "Gone",
    // });

    console.log(dayoffList);

    // const userRestDays = await pipe(
    //   getUserDayoffDays({ userId, year: +query.year }),
    //   toAsync,
    //   toArray,
    //   reduce((acc, el) => acc + el)
    // );

    // 특정 타입의 days 합계 구하기
    // const { _sum } = await db.dayoff.aggregate({
    //   where: {
    //     userId,
    //     year,
    //     type: "Used",
    //   },
    //   _sum: {
    //     days: true,
    //   },
    // });

    // console.log("publishedDayoffSum", _sum);

    return res.status(200).json({});
  } else {
    return res.status(400).json({
      ok: false,
    });
  }
};

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);

/**
 * 사용가능한 휴가 갯수 계산
 * 각각의 총 갯수를 조회 / 해당 년도의 총 갯수 = 발생된 휴가 + 사용한 휴가(-) + 소멸된 휴가(-) + 이월된 휴가(-)
 * 사용한 휴가
 * 휴가의 상태가 Approved 인것만 차감, 즉 아직 승인되지 않은 휴가는 차감하지 않음
 */

// aggregate = sum 같은 연산 가능
/**
 * 여러개의 조건을 조회
 * type: {
        in: ["Used", "Gone"],
      },
 */
