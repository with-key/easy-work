import React from "react";
import { styled } from "@styles/stitches.config";

import { useGetDayoffsByUser } from "@apis/repositories/dayoff/admin/useGetDayoffsByUser";

import * as Header from "@components/core/header";
import { HStack } from "@components/core/stack";
import { ButtonImpl } from "@components/core/button";
import { StyledButtons } from "@components/template/button";
import Divider from "@components/core/divider";
import DayoffItem from "@features/dayoff/user/DayoffItem";
import Text from "@components/core/text";
import { Space } from "@components/core/space";

const UserDayoffDetail = () => {
  const { userDayoffs, loading } = useGetDayoffsByUser(2023);

  return (
    <>
      <Header.Root>
        <Header.LeftSlot>이전</Header.LeftSlot>
      </Header.Root>
      <Content>
        <HStack
          css={{
            jc: "space-between",
          }}
        >
          <Aavatar />
          <ButtonImpl>
            <StyledButtons.Secondary shape="small02">
              휴가발급
            </StyledButtons.Secondary>
          </ButtonImpl>
        </HStack>
      </Content>
      <Divider>
        <Space css={{ rpy: 5, rpx: 30 }}>
          <Text shape="T13_500">연차현황</Text>
        </Space>
      </Divider>
      <Space css={{ rpy: 14, rpx: 30 }}>
        <HStack css={{ jc: "space-between" }}>
          <Text shape="T14_600">발생</Text>
          <Text shape="T14_600">0일</Text>
        </HStack>
      </Space>
      <Space css={{ rpy: 14, rpx: 30 }}>
        <HStack css={{ jc: "space-between" }}>
          <Text shape="T14_600">이월</Text>
          <Text shape="T14_600">0일</Text>
        </HStack>
      </Space>
      <Space css={{ rpy: 14, rpx: 30 }}>
        <HStack css={{ jc: "space-between" }}>
          <Text shape="T14_600">소멸</Text>
          <Text shape="T14_600">0일</Text>
        </HStack>
      </Space>
      <Space css={{ rpy: 14, rpx: 30 }}>
        <HStack css={{ jc: "space-between" }}>
          <Text shape="T14_600">사용</Text>
          <Text shape="T14_600">0일</Text>
        </HStack>
      </Space>
      <Space css={{ rpy: 14, rpx: 30 }}>
        <HStack css={{ jc: "space-between" }}>
          <Text shape="T14_600">잔여</Text>
          <Text shape="T14_600">0일</Text>
        </HStack>
      </Space>
      <Divider></Divider>
      <Divider />
      <DayoffListWrapper>
        <Space css={{ rpt: 34, rpb: 20 }}>
          <Text shape="T20_800">휴가 사용내역</Text>
        </Space>
        {loading ? (
          <>
            <Text shape="T14_600" align="center">
              로딩 중
            </Text>
          </>
        ) : (
          userDayoffs?.map((dayoff) => (
            <DayoffItem key={dayoff.id} dayoff={dayoff} />
          ))
        )}
      </DayoffListWrapper>
    </>
  );
};

export default UserDayoffDetail;

const Content = styled("div", {
  rpx: 30,
});

const Aavatar = styled("div", {
  width: 60,
  height: 60,
  bc: "$gary05",
  borderRadius: "100%",
});

const DayoffListWrapper = styled("div", {
  rpx: 30,
  rpb: 50,
});
