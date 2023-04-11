import React from "react";
import { styled } from "@styles/stitches.config";

import MyDayoffInfo from "@features/dayoff/MyDayoffInfo";
import MySpecialDayoff from "@features/dayoff/MySpecialDayoff";
import Divider from "@components/core/divider";
import DayoffList from "@features/dayoff/DayoffList";

const DayoffMainPage = () => {
  return (
    <PageContainer>
      <MyDayoffInfo />
      <Divider css={{ rmt: 27, rmb: 34 }} />
      <MySpecialDayoff />
      <Divider css={{ rmt: 33, rmb: 34 }} />
      <DayoffList />
    </PageContainer>
  );
};

export default DayoffMainPage;

const PageContainer = styled("section", {
  minHeight: "100vh",
  rpx: 30,
  rpy: 30,
});
