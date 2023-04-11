import React, { PropsWithChildren } from "react";

import { HStack } from "@components/Stack";
import Tag from "@components/Tag";
import { Dayoff } from "@prisma/client";

import { formattedDate } from "@libs/client/date";
import { genDayoffCatrgory, genDayoffStatus } from "@libs/client/convertValue";
import { styled } from "@styles/stitches.config";

interface Props extends PropsWithChildren {
  dayoff: Dayoff;
}

const DayoffItem = ({ dayoff }: Props) => {
  const { category, status, startDate, endDate, reason } = dayoff;

  return (
    <Container>
      <HStack css={{ gap: 4 }}>
        <div>{genDayoffCatrgory(category)}</div>
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
      <div>
        {formattedDate(startDate)}~{formattedDate(endDate)}
      </div>
    </Container>
  );
};

export default DayoffItem;
const Container = styled("div", {
  height: 45,
  border: "1px solid #ddd",
});
