import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import { DayoffType } from "@prisma/client";
import {
  pipe,
  toAsync,
  range,
  map,
  filter,
  take,
  each,
  concurrent,
  toArray,
  reduce,
} from "@fxts/core";

type Query = { year: string };

type Params = {
  userId?: number;
  year: number;
  type?: DayoffType;
};

const getDayoffByType = ({ userId, year, type }: Params) => {
  return db.dayoff.count({
    where: {
      userId,
      year,
      type: type,
    },
  });
};

const getUserDayoffDays = ({ userId, year }: Params) =>
  [
    DayoffType.Gone,
    DayoffType.Passed,
    DayoffType.Published,
    DayoffType.Used,
  ].map((el) => getDayoffByType({ userId, year, type: el }));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as Query;
  const userId = req.session.user?.id;

  if (req.method === "GET") {
    const userRestDays = await pipe(
      getUserDayoffDays({ userId, year: +query.year }),
      toAsync,
      toArray,
      reduce((acc, el) => acc + el)
    );

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
 *  휴가의 상태가 Approved 인것만 차감, 즉 아직 승인되지 않은 휴가는 차감하지 않음
 */
