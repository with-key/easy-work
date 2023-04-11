import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { isArray } from "@fxts/core";

import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import db from "@libs/server/db";
import { formatDate } from "@server/features/holidays/libs/formatDate";

/**
 * @doc 공공 API 조회
 *
 */

type Koreahoildays = {
  dateKind: string;
  dateName: string;
  isHoliday: "Y" | "N";
  locdate: number;
  seq: number;
};

export const getKoreaHoildays = async (year: string, month: string) => {
  try {
    const { data } = await axios.get(
      `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=${`2B235ZQE2IO9bT7bOBLY4gpmeR0E2J%2Bw8SfPfy4ihwB2dMzQpDhaxHCOrHwhdqSLD7vj9ic5160UMSbK6BXX5A%3D%3D`}&solYear=${year}&solMonth=${month}&_type=json`,
      {
        timeout: 5000,
      }
    );

    const result: Koreahoildays | Array<Koreahoildays> | undefined =
      data.response.body.items.item;

    if (result) {
      if (!isArray(result)) {
        if (result.isHoliday === "N")
          return {
            ok: true,
            message: "해당 월에 공휴일이 없습니다.",
          };

        const modelHoliday = {
          dateKind: result.dateKind,
          dateName: result.dateName,
          isHoliday: result.isHoliday === "Y" ? true : false,
          date: new Date(formatDate(result.locdate.toString()).full),
          year: formatDate(result.locdate.toString()).year,
          month: formatDate(result.locdate.toString()).month,
        };

        await db.holiday.create({
          data: modelHoliday,
        });

        return {
          ok: true,
          message: "1건의 공휴일 저장완료",
        };
      }

      const holidaysArray = result
        .filter((el) => el.isHoliday === "Y")
        .map((el) => ({
          dateKind: el.dateKind,
          dateName: el.dateName,
          isHoliday: el.isHoliday === "Y" ? true : false,
          date: new Date(formatDate(el.locdate.toString()).full),
          year: formatDate(el.locdate.toString()).year,
          month: formatDate(el.locdate.toString()).month,
        }));

      await db.holiday.createMany({
        data: holidaysArray,
      });

      return {
        ok: true,
        message: `${holidaysArray.length}건의 공휴일 저장완료`,
      };
    }

    return {
      ok: true,
      message: "해당 월에 공휴일이 없습니다.",
    };
  } catch (e) {
    return {
      ok: false,
      message: "오류가 발생했습니다.",
    };
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { year, month } = req.body as { year: string; month: string };
  const result = await getKoreaHoildays(year, month);

  if (result.ok) {
    return res.status(200).json({
      ok: result.ok,
      message: result.message,
    });
  }

  return res.status(404).json({
    ok: result.ok,
    message: result.message,
  });
};

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  })
);
