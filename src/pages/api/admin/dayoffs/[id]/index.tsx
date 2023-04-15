import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";
import { Status } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { status }: { status: Status } = req.body;

  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "id를 입력해주세요.",
    });
  }

  if (!status) {
    return res.status(400).json({
      ok: false,
      message: "변경하고자 하는 상태를 입력해주세요.",
    });
  }

  // 수정 (PUT)
  if (req.method === "PUT") {
    const result = await db.dayoff.update({
      where: {
        id: Number(id),
      },
      data: { status },
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      ok: true,
      message: "상태가 변경되었습니다.",
      result: {
        id: result.id,
      },
    });
  }
};

export default withApiSession(
  withHandler({
    method: ["PUT"],
    isPrivate: false,
    roles: ["All"],
    handler,
  })
);
