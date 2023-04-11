import React, { PropsWithChildren } from "react";
import dayjs from "dayjs";
import { Dayoff } from "@prisma/client";

import { formattedDate } from "@libs/client/date";
import { genDayoffCatrgory, genDayoffStatus } from "@libs/client/convertValue";

import Tag from "@components/Tag";
import Text from "@components/core/text";
import { HStack } from "@components/Stack";
import { Space } from "@components/Space";
import Divider from "@components/core/divider";
import { styled } from "@styles/stitches.config";

interface Props extends PropsWithChildren {
  dayoff: Dayoff;
}

const DayoffItem = ({ dayoff }: Props) => {
  const { category, status, startDate, endDate, days, createAt } = dayoff;
  const CreateDate = dayjs(createAt).format("M.DD");

  return (
    <HStack css={{ gap: 15 }}>
      <Space css={{ rpy: 12 }}>
        <Text shape="T14_400">{CreateDate}</Text>
      </Space>
      <Space
        css={{ borderBottom: "$gary04 1px solid", rpy: 12, width: "100%" }}
      >
        <HStack css={{ gap: 4 }}>
          <Text shape="T15_600">{genDayoffCatrgory(category)}</Text>
          <Tag
            theme={
              status === "Approved"
                ? "positive"
                : status === "Pending"
                ? "idle"
                : "negative"
            }
          >
            {genDayoffStatus(status)}
          </Tag>
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
