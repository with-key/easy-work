import React, { PropsWithChildren } from "react";
import dayjs from "dayjs";

import Tag from "@components/core/tag";
import Text from "@components/core/text";

import { HStack } from "@components/core/stack";
import { Space } from "@components/core/space";
import { styled } from "@styles/stitches.config";
import { useRouter } from "next/router";

import { ClientDayoff } from "@apis/services/getDayoff.service";

interface Props extends PropsWithChildren {
  dayoff: ClientDayoff;
}

const DayoffItem = ({ dayoff }: Props) => {
  const router = useRouter();
  const { category, status, startDate, endDate, days, createAt } = dayoff;
  const CreateDate = dayjs(createAt).format("M.DD");

  return (
    <HStack
      css={{ gap: 15 }}
      onClick={() => {
        return router.push(`dayoff/${dayoff.id}`);
      }}
    >
      <Space css={{ rpy: 12 }}>
        <Text shape="T14_400">{CreateDate}</Text>
      </Space>
      <Space
        css={{ borderBottom: "$gary04 1px solid", rpy: 12, width: "100%" }}
      >
        <HStack css={{ gap: 4, ai: "center" }}>
          <Text shape="T15_600">{category}</Text>
          <Tag status={status}>{dayoff.status}</Tag>
        </HStack>
        <HStack css={{ gap: 8, ai: "center" }}>
          <Text shape="T13_400">
            {startDate}~{endDate}
          </Text>
          <Vertical />
          <Text shape="T13_500" color="red500">
            {days}
          </Text>
        </HStack>
      </Space>
    </HStack>
  );
};

export default DayoffItem;

const Vertical = styled("div", {
  width: 1,
  height: 10,
  bc: "$gary04",
});
