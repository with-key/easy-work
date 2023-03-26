import React from "react";

import { useGetDayoffList } from "@apis/repositories/dayoff";

import DayoffItem from "./DayoffItem";

const DayoffList = () => {
  const { dayoffList } = useGetDayoffList();

  return (
    <>
      {dayoffList?.map((dayoff) => (
        <DayoffItem dayoff={dayoff} key={dayoff.id} />
      ))}
    </>
  );
};

export default DayoffList;
