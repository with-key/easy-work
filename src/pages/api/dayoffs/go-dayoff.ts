import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

import { goDayoffService } from "@server/features/dayoff/services/goDayoffService";

const goDayoffController = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return goDayoffService(req, res);
  }

  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      message: "GET 요청 성공",
    });
  }
};

export default withApiSession(
  withHandler({
    method: ["POST", "GET"],
    handler: goDayoffController,
  })
);
