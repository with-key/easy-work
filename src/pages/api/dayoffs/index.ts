import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

type AdminQuery = {
  target: "admin";
  year: string;
  userId: string;
};

type UserQuery = {
  target: "user";
  year: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionUserId = req.session.user?.id;
  const query = req.query as AdminQuery | UserQuery;

  // 관리자 여부
  const isAdmin = req.session.user?.role === "Admin";

  // 유저의 권한에 따른 userId 조회 설정
  const userId =
    query.target === "admin" && isAdmin ? +query.userId : sessionUserId;

  if (!query.year) {
    return res.status(400).json({
      ok: false,
      message: "year query가 없습니다.",
    });
  }

  // 로그인한 사용자의 모든 휴가내역 조회
  if (req.method === "GET") {
    const dayoffs = await db.dayoff.findMany({
      where: {
        userId,
        year: +query.year,
      },
      orderBy: {
        createAt: "desc",
      },

      select: {
        id: true,
        startDate: true,
        endDate: true,
        createAt: true,
        status: true,
        days: true,
        reason: true,
        type: true,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "휴가 내역 조회 성공",
      result: dayoffs,
    });
  }

  return res.status(400).json({
    ok: false,
    message: "잘못된 요청입니다.",
  });
};

export default withApiSession(
  withHandler({
    method: ["GET"],
    isPrivate: false,
    roles: ["All"],
    handler,
  })
);
