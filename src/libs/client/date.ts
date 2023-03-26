import dayjs from "dayjs";

export const formattedDate = (date: Date) => dayjs(date).format("YY.MM.DD");
