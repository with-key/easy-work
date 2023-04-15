import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

import db from "@libs/server/db";
import { map, pipe, toArray } from "@fxts/core";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return res.status(201).json({});
  }

  if (req.method === "GET") {
    const users = await db.user.findMany({
      include: {
        Dayoff: {
          where: {
            status: "Approved",
          },
          select: {
            days: true,
          },
        },
      },
    });

    const result = pipe(
      users,
      map(({ Dayoff, ...rest }) => {
        const days = Dayoff.flat().reduce((acc, cur) => {
          return acc + cur.days;
        }, 0);

        return {
          id: rest.id,
          nickname: rest.nickname,
          joinDay: rest.joinDay,
          avatar: rest.avatar,
          days,
        };
      }),
      toArray
    );

    return res.status(200).json({
      ok: true,
      message: "유저 조회 성공",
      result,
    });
  }

  if (req.method === "PUT") {
    return res.status(200).json({});
  }

  if (req.method === "DELETE") {
    return res.status(200).json({});
  }

  return res.status(405).json({
    ok: false,
    message: "Method Not Allowed",
  });
};

export default withApiSession(
  withHandler({
    method: ["POST", "GET", "DELETE", "PUT"],
    isPrivate: true,
    roles: ["All"],
    handler,
  })
);
