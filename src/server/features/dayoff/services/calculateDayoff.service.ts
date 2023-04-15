import { NextApiRequest, NextApiResponse } from "next";
import { calculateDays } from "../logic/calculateDays";
import dayoffRepository from "../repositories/dayoffs.repository";
import dayjs from "dayjs";

export const calculateDayoffService = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { getUserDayoffCount } = dayoffRepository();
  const { startDate, endDate } = req.query;
  const userId = req.session.user.id;

  if (startDate && endDate) {
    const newStartDate = new Date(startDate.toString());
    const newEndDate = new Date(endDate.toString());

    // days
    const count = await calculateDays(newStartDate, newEndDate, "Full");

    // available days
    const hasDays = await getUserDayoffCount(userId, dayjs().year());

    return res.status(200).json({
      ok: true,
      message: 'Successfully calculated "dayoff".',
      result: {
        count: count.days,
        hasDays,
      },
    });
  }

  return res.status(400).json({
    ok: false,
    message: 'Missing "startDate" or "endDate" query parameter.',
  });
};
