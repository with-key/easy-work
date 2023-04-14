import { NextApiRequest, NextApiResponse } from "next";

type Method = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
type Handler = (req: NextApiRequest, res: NextApiResponse) => void;
export type Roles = "Admin" | "User" | "Root" | "All";

type ConfigType = {
  method: Method[];
  handler: Handler;
  isPrivate: boolean;
  roles?: Roles[];
};

type Operator = {
  req: NextApiRequest;
  res: NextApiResponse;
  handler: Handler;
  method: Method[];
};

const operator = ({ req, res, method, handler }: Operator) => {
  if (!method.includes(req.method as Method)) {
    return res.status(405).json({
      ok: false,
      message: "잘못된 method 입니다.",
    });
  }

  try {
    return handler(req, res);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const withHandler = ({ method, handler, roles, isPrivate }: ConfigType) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Public API
    if (!isPrivate) {
      return operator({ req, res, method, handler });
    }

    // Private API
    if (isPrivate && !req.session.user) {
      return res.status(401).json({
        ok: false,
        message: "로그인이 필요합니다.",
      });
    }

    // Private & All API
    if (roles?.includes("All")) {
      return operator({ req, res, method, handler });
    }

    // Private & Strict API
    if (!roles?.includes(req.session.user.role)) {
      return res.status(403).json({
        ok: false,
        message: "권한이 없습니다.",
      });
    }

    return operator({ req, res, method, handler });
  };
};

export default withHandler;
