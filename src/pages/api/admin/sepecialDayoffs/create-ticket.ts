import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 관리자 여부
  const isAdmin =
    req.session.user?.role === "Root" || req.session.user?.role === "Admin";

  if (!isAdmin) {
    return res.status(403).json({
      ok: false,
      message: "권한이 없습니다.",
    });
  }

  if (req.method === "POST") {
    return;
  }
};

export default withApiSession(
  withHandler({
    method: ["POST"],
    isPrivate: false,
    roles: ["Admin", "Root"],
    handler,
  })
);
