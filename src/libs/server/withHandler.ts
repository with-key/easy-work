import { NextApiRequest, NextApiResponse } from "next";

type Method = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

type ConfigType = {
  method: Method[];
  handler: Handler;
  isPrivate?: boolean;
};

const withHandler = ({ method, handler, isPrivate }: ConfigType) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!method.includes(req.method as Method)) {
      return res.status(405).end();
    }

    try {
      handler(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
};

export default withHandler;
