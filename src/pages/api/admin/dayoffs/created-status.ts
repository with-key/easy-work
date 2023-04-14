import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import { DayoffType } from "@prisma/client";
import { pipe, toArray, toAsync } from "@fxts/core";

type DayoffCategoryUnion = keyof typeof DayoffType;
type GetDayoffSumEachType = {
  userId: number;
  year: number;
  type: DayoffType;
};

// 휴가 발행 (소멸, 이월, 새로 발행)
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as { year: string; id: string };

  const year = +query.year;
  const sessionUserId = req.session.user?.id;

  try {
    if (!year) {
      const error = new Error();
      5;
      throw Object.assign(error, {
        message: "400",
        cause: "사용할 수 없는 query",
      });
    }

    /**
     * @doc 특정 유저의 각 DayoffType들의 days 합계를 산출한다.
     *
     */
    const getDayoffSumEachType = ({
      userId,
      year,
      type,
    }: GetDayoffSumEachType) => {
      return db.dayoff.aggregate({
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

    /**
     * @doc 모든 타입의 days 합계를 구하고, type, days를 가진 배열을 생성한다.
     *
     */
    const getDayoffSumAllTypes = Object.keys(DayoffType).map(async (type) => {
      const daysCount = await getDayoffSumEachType({
        userId: sessionUserId, // 관리자는 query.user.id를 사용하고 사용자는 session.user.id를 사용한다.
        type: type as DayoffCategoryUnion,
        year,
      });

      return {
        type,
        days: daysCount._sum.days ?? 0,
      };
    });

    const result = await pipe(getDayoffSumAllTypes, toAsync, toArray);
    return res.status(200).json({
      ok: true,
      message: "success",
      result,
    });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({
        ok: false,
        result: null,
        msg: e.cause,
      });
    }
  }
};

export default withApiSession(
  withHandler({
    method: ["GET"],
    roles: ["Root"],
    isPrivate: true,
    handler,
  })
);
