// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import withHandler from "@/libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";

type Payload = {
  name: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Payload>) =>
  res.status(200).json({
    name: "hello",
  });

export default withHandler("GET", handler);
