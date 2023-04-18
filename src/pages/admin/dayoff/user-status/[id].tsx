import React from "react";
import { styled } from "@styles/stitches.config";

import { useGetDayoffsByUser } from "@apis/repositories/dayoff/admin/useGetDayoffsByUser";
import { useGetUserDayoffStatus } from "@apis/repositories/dayoff/admin/useGetUserDayoffStatus";

import * as Header from "@components/core/header";
import Divider from "@components/core/divider";
import DayoffItem from "@features/dayoff/user/DayoffItem";
import Text from "@components/core/text";
import { ButtonImpl } from "@components/core/button";
import { StyledButtons } from "@components/template/button";
import { HStack, VStack } from "@components/core/stack";
import { Space } from "@components/core/space";
import UserList from "@features/dayoff/admin/userStatus/UserList";

const UserDayoffDetail = () => {
  const dayoffs = useGetDayoffsByUser(2023);
  const dayoffStatus = useGetUserDayoffStatus(2023);

  return (
    <>
      <Header.Root>
        <Header.LeftSlot>이전</Header.LeftSlot>
      </Header.Root>
      <UserList />
      <Content>
        <HStack
          css={{
            jc: "space-between",
            ai: "center",
          }}
        >
          <Aavatar />
          <ButtonImpl>
            <StyledButtons.Secondary shape="small02">
              휴가발급
            </StyledButtons.Secondary>
          </ButtonImpl>
        </HStack>
        <VStack>
          <Text>With(예상기)</Text>
          <Text> 2017.03.12 입사</Text>
        </VStack>
      </Content>
      <Divider>
        <Space css={{ rpy: 5, rpx: 30 }}>
          <Text shape="T13_500" color="gary08">
            연차현황
          </Text>
        </Space>
      </Divider>
      {!dayoffStatus.dayoffStatus ? (
        <HStack css={{ height: 250, ai: "center", jc: "center" }}>
          <Text shape="T14_600">로딩 중</Text>
        </HStack>
      ) : (
        <>
          {dayoffStatus.dayoffStatus.map((status) => (
            <Space css={{ rpy: 14, rpx: 30 }} key={status.type}>
              <HStack css={{ jc: "space-between" }}>
                <Text shape="T14_600">{status.type}</Text>
                <Text shape="T14_600">{status.days}일</Text>
              </HStack>
            </Space>
          ))}
          <Space css={{ rpy: 14, rpx: 30 }}>
            <HStack css={{ jc: "space-between" }}>
              <Text shape="T14_600">잔여</Text>
              <Text shape="T14_600">{dayoffStatus.restDays}일</Text>
            </HStack>
          </Space>
        </>
      )}

      {/* 특별휴가 현황 */}
      <Divider>
        <Space css={{ rpy: 5, rpx: 30 }}>
          <Text shape="T13_500" color="gary08">
            특별 휴가
          </Text>
        </Space>
      </Divider>
      <Space css={{ rpy: 14, rpx: 30 }}>
        <HStack css={{ jc: "space-between" }}>
          <Text shape="T14_600">연말정산 특별휴가</Text>
          <Text shape="T14_600">0일</Text>
        </HStack>
      </Space>
      <Space css={{ rpy: 14, rpx: 30 }}>
        <HStack css={{ jc: "space-between" }}>
          <Text shape="T14_600">여름휴가</Text>
          <Text shape="T14_600">0일</Text>
        </HStack>
      </Space>
      <Space css={{ rpy: 14, rpx: 30 }}>
        <HStack css={{ jc: "space-between" }}>
          <Text shape="T14_600">멍떠</Text>
          <Text shape="T14_600">0일</Text>
        </HStack>
      </Space>
      <Space css={{ rpy: 14, rpx: 30 }}>
        <HStack css={{ jc: "space-between" }}>
          <Text shape="T14_600">Apple Vacation</Text>
          <Text shape="T14_600">0일</Text>
        </HStack>
      </Space>
      <Divider />
      <DayoffListWrapper>
        <Space css={{ rpt: 34, rpb: 20 }}>
          <Text shape="T20_800">휴가 사용내역</Text>
        </Space>
        {!dayoffs.userDayoffs ? (
          <HStack
            css={{
              height: 200,
              ai: "center",
              jc: "center",
            }}
          >
            <Text shape="T14_600" align="center">
              로딩 중
            </Text>
          </HStack>
        ) : (
          dayoffs.userDayoffs.map((dayoff) => (
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
