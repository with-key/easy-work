import React from "react";
import { useGetDayoffList } from "@apis/repositories/dayoff";
import DayoffList from "@features/dayoff/DayoffList";

const DayoffMainPage = () => {
  return (
    <div>
      <DayoffList></DayoffList>
    </div>
  );
};

export default DayoffMainPage;
