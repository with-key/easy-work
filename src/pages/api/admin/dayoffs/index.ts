import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { giveDayoff } from "@server/admin/dayoff/giveDayoff";

const dayoffController = async (req: NextApiRequest, res: NextApiResponse) => {
  // 관리자의 연차 발행
  if (req.method === "POST") {
    return await giveDayoff(req, res);
  }

  if (req.method === "GET") {
    return res.status(200).json({});
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
    isPrivate: false,
    roles: ["All"],
    handler: dayoffController,
  })
);
