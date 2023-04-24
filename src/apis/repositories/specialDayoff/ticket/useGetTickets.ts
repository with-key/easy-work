import { apis } from "@apis/axios/instance";
import { SpecialDayoffCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

type Reponse = {
  ok: boolean;
  message: string;
  result: {
    id: number;
    category: string;
    days: number;
    dueDate: string;
  }[];
};

export const useGetTickets = () => {
  const queryFn = async (): Promise<Reponse> => {
    const { data } = await apis.get("/special-dayoffs/tickets", {
      params: {
        year: 2023,
      },
    });
    return data;
  };

  const { data, ...rest } = useQuery({
    queryKey: [""],
    queryFn,
  });

  const tickets = data?.result.map((ticket) => ({
    ...ticket,
    dueDate: convertDays(ticket.dueDate),
    label: covertToKoreanValue(ticket.category as SpecialDayoffCategory),
  }));

  return { tickets };
};

const categoryToKorean = {
  [SpecialDayoffCategory.Apple]: "애플 베케이션",
  [SpecialDayoffCategory.Childcare]: "육아휴직",
  [SpecialDayoffCategory.Compassionate]: "동반가족 돌봄휴가",
  [SpecialDayoffCategory.FamilyCare]: "가족 돌봄휴가",
  [SpecialDayoffCategory.Maternity]: "출산휴가",
  [SpecialDayoffCategory.Paternity]: "배우자 출산휴가",
  [SpecialDayoffCategory.Medical]: "병가",
  [SpecialDayoffCategory.Mung]: "멍떠",
  [SpecialDayoffCategory.Official]: "공가",
  [SpecialDayoffCategory.Refresh]: "연말정산 특별휴가",
  [SpecialDayoffCategory.Summer]: "여름휴가",
};

// categoryToKorean를 사용해서 카테고리를 한글로 바꿔줍니다.
export function covertToKoreanValue(cateory: SpecialDayoffCategory) {
  return categoryToKorean[cateory];
}

// dueDate를 받아서 D-day를 계산해줍니다.
function convertDays(dueDate: string) {
  if (!dueDate) return "제한없음";

  // dayjs().diff(dayjs(dueDate), "day")를 사용해서 D-day를 계산합니다.
  const days = dayjs().diff(dayjs(dueDate), "day");
  if (days === 0) return "오늘 신청마감";
  return `D${days}`;
}
