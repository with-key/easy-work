import React, { Fragment } from "react";
import Text from "@components/core/text";
import { HStack, VStack } from "@components/Stack";
import { BaseButtonImple } from "@components/core/button/index";
import { Primary } from "@components/template/button";
import { Space } from "@components/Space";
import { styled } from "@styles/stitches.config";

const dayoffs = [
  {
    id: 1,
    name: "연말정산 특별휴가",
    count: 5,
    dueDate: 3,
  },
  {
    id: 2,
    name: "여름 휴가",
    count: 5,
    dueDate: 3,
  },
  {
    id: 3,
    name: "멍떠",
    count: 5,
    dueDate: 3,
  },
  {
    id: 4,
    name: "Apple vacation",
    count: 5,
    dueDate: 3,
  },
];

const MySpecialDayoff = () => {
  return (
    <>
      <Text shape="T20_800">특별휴가</Text>
      <VStack css={{ gap: 20 }}>
        {dayoffs.map((el) => (
          <DayoffCard key={el.id}>
            <div>이미지</div>
            <VStack css={{ jc: "space-between" }}>
              <Text shape="T15_600">{el.name}</Text>
              <HStack>
                <Text shape="T14_600" color="blue500">
                  {el.count}일
                </Text>
                <Text shape="T14_600" color="red500">
                  D-{el.dueDate}
                </Text>
              </HStack>
            </VStack>
          </DayoffCard>
        ))}
      </VStack>
    </>
  );
};

export default MySpecialDayoff;

const DayoffCard = styled("div", {
  height: 46,
  border: "1px solid red",
  display: "flex",
  gap: 12,
});
