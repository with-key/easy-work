import { Dayoff } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDayoffList = async (): Promise<{
  dayoffList: Dayoff[];
  ok: boolean;
}> => {
  const { data } = await axios.get("/api/dayoff");
  return data;
};

export const useGetDayoffList = () => {
  const { data } = useQuery({
    queryKey: ["DAYOFF_LIST"],
    queryFn: fetchDayoffList,
  });

  return {
    dayoffList: data?.dayoffList,
  };
};
