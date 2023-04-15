import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { calculateDayoffService } from "@server/features/dayoff/services/calculateDayoff.service";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return calculateDayoffService(req, res);
  }
};

export default withApiSession(
  withHandler({
    method: ["GET"],
    isPrivate: false,
    handler,
  })
);
