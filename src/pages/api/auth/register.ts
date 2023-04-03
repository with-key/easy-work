import { NextApiRequest, NextApiResponse } from "next";
import db from "@libs/server/db";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import * as bcrypt from "bcrypt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await db.user.create({
      data: {
        name: "Anonymous",
        password: hashedPassword,
        email,
      },
    });

    console.log(createdUser);

    return res.status(201).json({
      ok: true,
      msg: "유저 생성이 완료되었습니다.",
    });
  } else {
    return res.status(409).json({
      ok: false,
      msg: "이미 존재하는 이메일이 있습니다.",
    });
  }
}

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  })
);
