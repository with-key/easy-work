import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { calculateDayoffService } from "@server/features/dayoff/services/calculateDayoff.service";

// 잔여 연차 및 휴가일수 계산
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return calculateDayoffService(req, res);
};

export default withApiSession(
  withHandler({
    method: ["GET"],
    isPrivate: true,
    roles: ["All"],
    handler,
  })
);
