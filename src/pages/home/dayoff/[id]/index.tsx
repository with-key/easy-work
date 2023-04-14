import React from "react";

import { useAppRouter } from "@hooks/useAppRouter";

import * as Header from "@components/core/header";
import Text from "@components/core/text";

import { HStack } from "@components/core/stack";

import CancelDayoffAlert from "@features/dayoff/user/alertContainer/CancelDayoffAlert";
import { StyledButtons } from "@components/template/button";
import { useGetDayoffService } from "@apis/services/getDayoff.service";
import DayoffDetail from "@features/dayoff/common/DayoffDetail";

const DayoffDetailPage = () => {
  const router = useAppRouter();
  const { dayoff, isLoading } = useGetDayoffService();

  if (!dayoff || isLoading) return null;

  return (
    <>
      {/* 헤더  */}
      <Header.Root>
        <Header.LeftSlot onClick={() => router.goUpPath()}>
          이전
        </Header.LeftSlot>
        <Header.RightSlot>
          <HStack css={{ gap: 10 }}>
            <CancelDayoffAlert>
              <StyledButtons.Unset>
                <Text shape="T15_400" color="red500">
                  취소
                </Text>
              </StyledButtons.Unset>
            </CancelDayoffAlert>
            <Text
              shape="T15_400"
              color="blueTxt02"
              onClick={() => {
                router.push({
                  pathname: `${router.pathname}/edit`,
                  query: router.query,
                });
              }}
            >
              수정
            </Text>
          </HStack>
        </Header.RightSlot>
      </Header.Root>
      <DayoffDetail dayoff={dayoff} />
    </>
  );
};

export default DayoffDetailPage;
