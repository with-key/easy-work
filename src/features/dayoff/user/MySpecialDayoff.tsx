import React from "react";
import Text from "@components/core/text";
import { HStack, VStack } from "@components/core/stack";
import { styled } from "@styles/stitches.config";
import { useGetTickets } from "@apis/repositories/specialDayoff/ticket/useGetTickets";
import { Space } from "@components/core/space";
import Vertical from "@components/template/vertical";
import { useAppRouter } from "@hooks/useAppRouter";

const MySpecialDayoff = () => {
  const router = useAppRouter();
  const { tickets } = useGetTickets();

  return (
    <>
      <Space css={{ rmb: 20 }}>
        <Text shape="T20_800">특별휴가</Text>
      </Space>
      <VStack css={{ gap: 20 }}>
        {tickets?.map((el) => (
          <DayoffCard
            key={el.id}
            onClick={() => router.push(`/home/special-dayoff/add`)}
          >
            <div>이미지</div>
            <VStack css={{ jc: "space-between" }}>
              <Text shape="T15_600">{el.label}</Text>
              <HStack css={{ gap: 8, ai: "center" }}>
                <Text shape="T14_600" color="blue500">
                  {el.days}일
                </Text>
                <Vertical />
                <Text shape="T14_600" color="red500">
                  {el.dueDate}
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
  display: "flex",
  gap: 12,
  border: "1px solid red",
});
