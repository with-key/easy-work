import dayjs from "dayjs";

export const formattedDate = (date: string) => dayjs(date).format("YY.MM.DD");
