import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const options = {
  cookieName: "atnpeasyworksession",
  password: process.env.SESSION_PASSWORD!,
};

export const withApiSession = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void | NextApiResponse<any>>
) => {
  return withIronSessionApiRoute(handler, options);
};
