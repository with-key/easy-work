import React from "react";
import { styled } from "@styles/stitches.config";

import { useAppRouter } from "@hooks/useAppRouter";

import * as Header from "@components/core/header";
import Text from "@components/core/text";
import Divider from "@components/core/divider";
import Tag from "@components/core/tag";

import { HStack } from "@components/core/stack";
import { Space } from "@components/core/space";
import CancelDayoffAlert from "@features/dayoff/alertContainer/CancelDayoffAlert";
import { StyledButtons } from "@components/template/button";
import { useGetDayoffService } from "@apis/services/getDayoff.service";

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
      {/* 메인 정보 */}
      <Space css={{ rpx: 30, rpt: 5, rpb: 30 }}>
        <HStack css={{ ai: "center", gap: 8 }}>
          <Text shape="T26_800">{dayoff.category}</Text>
          <Tag status={"Approved"}>{dayoff.status}</Tag>
        </HStack>
        <Text shape="T15_400" color="gary06">
          {dayoff.createAt}
        </Text>
        <Space css={{ rmt: 25 }}>
          <Space css={{ rmb: 20 }}>
            <Text shape="T15_600" mb={4}>
              차감연차
            </Text>
            <Text as="span" shape="T20_800" color="red500">
              {dayoff.days}
            </Text>
            <Text as="span" shape="T15_700">
              일
            </Text>
          </Space>
          <Text shape="T15_600" mb={4}>
            잔여 연차
          </Text>
          <Text as="span" shape="T20_800">
            = 8.5
          </Text>
          <Text as="span" shape="T15_700">
            일
          </Text>
        </Space>
      </Space>
      <Divider />
      <Row>
        <Text shape="T14_600">휴가종류</Text>
        <Text shape="T14_400">일반휴가</Text>
      </Row>
      <Row>
        <Text shape="T14_600">반차여부</Text>
        <Text shape="T14_400">{dayoff.category}</Text>
      </Row>
      <Row>
        <Text shape="T14_600">시작일자</Text>
        <Text shape="T14_400">{dayoff.startDate}</Text>
      </Row>
      <Row>
        <Text shape="T14_600">종료일자</Text>
        <Text shape="T14_400">{dayoff.endDate}</Text>
      </Row>
      <Row>
        <Text shape="T14_600">사유</Text>
        <Text
          shape="T14_400"
          css={{
            maxWidth: 200,
            textAlign: "right",
          }}
        >
          {dayoff.reason}
        </Text>
      </Row>
    </>
  );
};

export default DayoffDetailPage;

const Row = styled(HStack, {
  jc: "space-between",
  minHeight: 50,
  ai: "center",
  rpx: 30,
  borderBottom: "$gary02 1px solid",
});
