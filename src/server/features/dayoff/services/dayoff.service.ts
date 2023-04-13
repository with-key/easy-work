import React from "react";
import dayoffRepository from "../repositories/dayoffs.repository";
import db from "@libs/server/db";

const DayoffsService = () => {
  const { dayoff: repository } = dayoffRepository();

  // 특정 유저의 상세 휴가정보 조회
  const getDayoffById = (id: number, userId: number) => {
    const dayoff = repository.findMany({
      where: {
        id,
        userId,
      },
    });

    return dayoff;
  };

  // 특정 유저의 휴가 삭제
  const deleteDayoff = () => {
    //
  };

  return { getDayoffById, deleteDayoff };
};

export default DayoffsService;
