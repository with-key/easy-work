import React, { PropsWithChildren } from "react";
import dayjs from "dayjs";
import { Dayoff } from "@prisma/client";

import { formattedDate } from "@libs/client/date";
// import { genDayoffCatrgory } from "@libs/client/convertValue";

import Tag from "@components/core/tag";
import Text from "@components/core/text";
import { HStack } from "@components/core/stack";
import { Space } from "@components/core/space";
import { styled } from "@styles/stitches.config";
import { useRouter } from "next/router";

interface Props extends PropsWithChildren {
  dayoff: Dayoff;
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
          <Tag status={status} />
        </HStack>
        <HStack css={{ gap: 8, ai: "center" }}>
          <Text shape="T13_400">
            {formattedDate(startDate)}~{formattedDate(endDate)}
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
