import { NextApiRequest, NextApiResponse } from "next";
import React from "react";

type Method = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

const withHandler = (method: Method, handler: Handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      return res.status(405).end();
    }

    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
};

export default withHandler;
