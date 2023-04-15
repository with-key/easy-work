import {
  ClientDayoffStuatusUser,
  DayoffStatusUser,
} from "@apis/repositories/dayoff/admin/useGetUsersStatus";
import { Space } from "@components/core/space";
import { HStack } from "@components/core/stack";
import Text from "@components/core/text";
import { styled } from "@styles/stitches.config";
import React from "react";

type Props = {
  user: ClientDayoffStuatusUser;
};

const UserInfoCard = ({ user }: Props) => {
  return (
    <Container>
      <HStack css={{ jc: "space-between", ai: "center" }}>
        <HStack css={{ gap: 12 }}>
          <Avatar />
          <Space>
            <Text shape="T14_600">{user.nickname}</Text>
            <Text shape="T11_700" color="gary06">
              {user.joinDay}
            </Text>
          </Space>
        </HStack>
        <Text shape="T15_600">{user.days}일</Text>
      </HStack>
    </Container>
  );
};

export default UserInfoCard;

const Container = styled("div", {
  rpy: 14,
  borderBottom: "1px solid $gary02",
});

const Avatar = styled("div", {
  width: 32,
  height: 32,
  bc: "$gary05",
  borderRadius: 20,
});
