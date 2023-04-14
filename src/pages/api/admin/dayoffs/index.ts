import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const dayoffController = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return res.status(201).json({});
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
    isPrivate: true,
    roles: ["All"],
    handler: dayoffController,
  })
);
