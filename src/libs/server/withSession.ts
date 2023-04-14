import { UserRoles } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user: {
      id: number;
      role: "Admin" | "User" | "Root" | "All";
    };
  }
}

const options = {
  cookieName: "session",
  password: process.env.SESSION_PASSWORD!,
  cookieOptions: {
    secure: true,
    sameSite: "lax" as const,
  },
};

export const withApiSession = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void | NextApiResponse<any>>
) => {
  return withIronSessionApiRoute(handler, options);
};
