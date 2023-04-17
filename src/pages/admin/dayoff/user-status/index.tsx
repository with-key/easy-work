import React from "react";
import { styled } from "@styles/stitches.config";
import { useAppRouter } from "@hooks/useAppRouter";

import { Space } from "@components/core/space";
import * as Header from "@components/core/header";
import Text from "@components/core/text";
import { HStack } from "@components/core/stack";
import { adminPageUrl } from "@apis/url/admin";
import { useGetUsersStatus } from "@apis/repositories/dayoff/admin/useGetUsersStatus";
import UserInfoCard from "@features/dayoff/admin/userStatus/UserInfoCard";

const UserDayoffStatus = () => {
  const router = useAppRouter();
  const usersStatus = useGetUsersStatus();

  return (
    <Space>
      <Header.Root>
        <Header.LeftSlot onClick={() => router.push("pending-status")}>
          이전
        </Header.LeftSlot>
        <Header.RightSlot>메뉴</Header.RightSlot>
      </Header.Root>

      <Space
        css={{
          height: "calc(100vh - 60px)",
          rpx: 30,
          rpt: 5,
        }}
      >
        <Space
          css={{
            rmb: 25,
          }}
        >
          <Text shape="T26_800">Day Off</Text>
        </Space>
        <HStack css={{ gap: 20 }}>
          <Text
            shape="T20_800"
            color="gary06"
            onClick={() => router.push(adminPageUrl.dayoff.pendingStatus)}
          >
            신청현황
          </Text>
          <Text shape="T20_800">휴가현황</Text>
        </HStack>
        <Space>
          <CreatDayoffButton>휴가발급</CreatDayoffButton>
          <Space css={{ rmt: 40 }}>
            <Text shape="T20_800">연차현황</Text>
          </Space>

          {usersStatus.users?.map((user) => (
            <UserInfoCard key={user.id} user={user} />
          ))}
        </Space>
      </Space>
    </Space>
  );
};

export default UserDayoffStatus;

const CreatDayoffButton = styled("button", {
  boxShadow: `0px 5px 20px rgba(0, 0, 0, 0.07)`,
  width: "100%",
  height: 100,
  borderRadius: 20,
  bc: "white",
});
