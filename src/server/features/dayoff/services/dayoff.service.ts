import { NextApiRequest, NextApiResponse } from "next";
import dayoffRepository from "../repositories/dayoffs.repository";

const DayoffsService = (req: NextApiRequest, res: NextApiResponse) => {
  const { dayoff: repository } = dayoffRepository();

  const userId = req.session.user?.id;
  const dayoffId = req.query.id?.toString();

  // 특정 유저의 상세 휴가정보 조회
  const getDayoffById = async () => {
    const dayoff = await repository.findUnique({
      where: {
        id: Number(dayoffId),
      },
    });

    if (!dayoff) {
      return res.status(400).json({
        ok: false,
        message: "존재하지 않는 휴가 내역입니다.",
      });
    }

    if (dayoff.userId !== userId) {
      return res.status(403).json({
        ok: false,
        message: "휴가 내역 조회 권한이 없습니다.",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "휴가 내역 조회 성공",
      result: dayoff,
    });
  };

  return { getDayoffById };
};

export default DayoffsService;
