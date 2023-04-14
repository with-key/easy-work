import React from "react";
import { styled } from "@styles/stitches.config";

import Divider from "@components/core/divider";

import * as Header from "@components/core/header";
import { useAppRouter } from "@hooks/useAppRouter";
import MyDayoffInfo from "@features/dayoff/user/MyDayoffInfo";
import MySpecialDayoff from "@features/dayoff/user/MySpecialDayoff";
import DayoffList from "@features/dayoff/user/DayoffList";

const DayoffMainPage = () => {
  const router = useAppRouter();
  return (
    <>
      <Header.Root>
        <Header.LeftSlot onClick={() => router.goUpPath()}>
          이전
        </Header.LeftSlot>
      </Header.Root>
      <PageContainer>
        <MyDayoffInfo />
        <Divider css={{ rmt: 27, rmb: 34 }} />
        <MySpecialDayoff />
        <Divider css={{ rmt: 33, rmb: 34 }} />
        <DayoffList />
      </PageContainer>
    </>
  );
};

export default DayoffMainPage;

const PageContainer = styled("section", {
  minHeight: "100vh",
  rpx: 30,
  rpy: 30,
});
