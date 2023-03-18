import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import * as bcrypt from "bcrypt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  // 유저 확인
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    const isOkPassword = await bcrypt.compare(password, user.password);

    if (isOkPassword) {
      req.session.user = {
        id: user.id,
      };

      await req.session.save();
      return res.status(200).end();
    }
  }

  return res.status(404).json({
    message: "유저의 정보가 일치하지 않습니다.",
  });
};

export default withApiSession(withHandler("POST", handler));
