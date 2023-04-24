import React, { useState } from "react";
import { styled } from "@styles/stitches.config";
import dayjs from "dayjs";
import { useAppRouter } from "@hooks/useAppRouter";

import * as Header from "@components/core/header";
import * as Input from "@components/core/input";
import * as Select from "@components/core/select";

import Text from "@components/core/text";

import { Space } from "@components/core/space";
import { HStack, VStack } from "@components/core/stack";
import { PrimarySelect } from "@components/template/select";
import { SpecialDayoffCategory } from "@prisma/client";
import { ButtonImpl } from "@components/core/button";
import { StyledButtons } from "@components/template/button";
import { BaseInput } from "@components/template/input";
import { useGetTickets } from "@apis/repositories/specialDayoff/ticket/useGetTickets";
import { AddSpecialDayoffPayload } from "@apis/specialDayoff";
import { useGoSpeicalDayoff } from "@apis/repositories/specialDayoff/goSpecialDayoff";

const SpecialDayoffAddpage = () => {
  const [specialDayoff, setSpecialDayoff] = useState<AddSpecialDayoffPayload>({
    category: "default",
    year: dayjs().year().toString(),
    startDate: new Date(),
    endDate: new Date(),
    startDateAt: "AM",
    endDateAt: "PM",
    reason: "",
  });

  const { tickets } = useGetTickets();
  const { goSpecialDayoff } = useGoSpeicalDayoff();
  const router = useAppRouter();

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSpecialDayoff((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <>
      <Header.Root>
        <Header.LeftSlot
          onClick={() => {
            return router.push("/home/dayoff");
          }}
        >
          닫기
        </Header.LeftSlot>
      </Header.Root>

      <Container>
        <Space
          css={{
            rmt: 5,
            rmb: 25,
          }}
        >
          <Text shape="T26_800">특별휴가 신청</Text>
        </Space>

        <VStack css={{ gap: 30 }}>
          <VStack css={{ gap: 13 }}>
            <Text shape="T15_700">특별휴가 선택</Text>
            <Select.Container
              asChild
              value={specialDayoff.category}
              onChange={(e) => {
                const { value } = e.target;
                setSpecialDayoff((pre) => ({
                  ...pre,
                  category: value as SpecialDayoffCategory,
                }));
              }}
            >
              <PrimarySelect>
                <Select.Item value="default" disabled>
                  신청할 특별휴가를 선택하세요.
                </Select.Item>
                {tickets
                  ? tickets.map((ticket) => (
                      <Select.Item key={ticket.id} value={ticket.category}>
                        {ticket.label}
                      </Select.Item>
                    ))
                  : null}
              </PrimarySelect>
            </Select.Container>
          </VStack>

          <VStack css={{ gap: 13 }}>
            <Text shape="T15_700">시작일자</Text>

            <HStack css={{ gap: 8 }}>
              <Input.Date
                asChild
                name="startDate"
                value={dayjs(specialDayoff.startDate).format("YYYY-MM-DD")}
                onChange={changeInputHandler}
              >
                <BaseInput css={{ width: "60%" }} />
              </Input.Date>
              <Select.Container
                asChild
                value={specialDayoff.startDateAt}
                onChange={(e) => {
                  const { value } = e.target;
                  setSpecialDayoff((pre) => ({
                    ...pre,
                    startDateAt: value as "AM" | "PM",
                  }));
                }}
              >
                <PrimarySelect css={{ width: "40%" }}>
                  <Select.Item value="AM">오전부터</Select.Item>
                  <Select.Item value="PM">오후부터</Select.Item>
                </PrimarySelect>
              </Select.Container>
            </HStack>
          </VStack>

          <VStack css={{ gap: 13 }}>
            <Text shape="T15_700">종료일자</Text>
            <HStack css={{ gap: 8 }}>
              <Input.Date
                asChild
                name="startDate"
                value={dayjs(specialDayoff.endDate).format("YYYY-MM-DD")}
                onChange={changeInputHandler}
              >
                <BaseInput css={{ width: "60%" }} />
              </Input.Date>
              <Select.Container
                asChild
                value={specialDayoff.endDateAt}
                onChange={(e) => {
                  const { value } = e.target;
                  setSpecialDayoff((pre) => ({
                    ...pre,
                    endDateAt: value as "AM" | "PM",
                  }));
                }}
              >
                <PrimarySelect css={{ width: "40%" }}>
                  <Select.Item value="AM">오전까지</Select.Item>
                  <Select.Item value="PM">오후까지</Select.Item>
                </PrimarySelect>
              </Select.Container>
            </HStack>
          </VStack>

          <VStack css={{ gap: 13 }}>
            <Text shape="T15_700">사유</Text>
            <Input.Text
              asChild
              name="reason"
              value={specialDayoff.reason}
              onChange={changeInputHandler}
              placeholder="사유를 입력해주세요."
            >
              <BaseInput />
            </Input.Text>
          </VStack>
        </VStack>

        <CurrentStatus>
          <Space
            css={{
              rmt: 24,
            }}
          >
            <ButtonImpl asChild>
              <StyledButtons.Primary
                shape="big02"
                onClick={() => {
                  goSpecialDayoff(specialDayoff);
                }}
              >
                신청하기
              </StyledButtons.Primary>
            </ButtonImpl>
          </Space>
        </CurrentStatus>
      </Container>
    </>
  );
};

export default SpecialDayoffAddpage;

const Container = styled("div", {
  minHeight: "calc(100vh - 60px)",
  padding: "0 30px",
});

const CurrentStatus = styled("div", {
  rmt: 40,
  bc: "$blue100",
  width: "100vw",
  marginLeft: "calc(-50vw + 50%)",
  padding: "24px 30px 40px 30px",
});

const Divider = styled("div", {
  bc: "$gary03",
  height: 1,
  rmy: 14,
});
