import React, { ChangeEvent, useState } from "react";
import { styled } from "@styles/stitches.config";
import dayjs from "dayjs";

import { HStack, VStack } from "@components/Stack";
import { Space } from "@components/Space";

import Text from "@components/core/text";
import * as Header from "@components/core/header";
import * as Input from "@components/core/input";
import * as Select from "@components/core/select";

import { BaseInput } from "@components/template/input";
import * as ButtonStyle from "@components/template/button";
import { PrimarySelect } from "@components/template/select";

import { DayoffCategory } from "@prisma/client";
import type { CreateDayoffPayload } from "@typings/dayoff/dayoff.type";
import { useGoDayoff } from "@apis/repositories/dayoff/useGoDayoff";

const DayoffAddPage = () => {
  const useDayoff = useGoDayoff();
  const [dayoff, setDayoff] = useState<CreateDayoffPayload>({
    category: "Full",
    startDate: new Date("2023-04-08"),
    endDate: new Date("2023-04-10"),
    reason: "개인사유",
  });

  const chanegeDayoffCategoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDayoff((pre) => ({ ...pre, category: value as DayoffCategory }));
  };

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setDayoff((pre) => ({ ...pre, [name]: value }));
  };

  const submitDayoffHandler = (payload: CreateDayoffPayload) => {
    useDayoff.mutate(payload);
  };

  return (
    <>
      <Header.Root>
        <Header.LeftSlot onClick={() => {}}>닫기</Header.LeftSlot>
      </Header.Root>

      <Container>
        <Space
          css={{
            rmt: 5,
            rmb: 25,
          }}
        >
          <Text shape="T26_800">연차쓰기</Text>
        </Space>

        <VStack css={{ gap: 30 }}>
          <VStack css={{ gap: 13 }}>
            <Text shape="T15_700">휴가종류</Text>
            <Select.Container
              asChild
              value={dayoff.category}
              onChange={chanegeDayoffCategoryHandler}
            >
              <PrimarySelect>
                <Select.Item value={DayoffCategory.Full}>연차</Select.Item>
                <Select.Item value={DayoffCategory.AmHalf}>
                  오전반차
                </Select.Item>
                <Select.Item value={DayoffCategory.PmHalf}>
                  오후반차
                </Select.Item>
              </PrimarySelect>
            </Select.Container>
          </VStack>

          <VStack css={{ gap: 13 }}>
            <Text shape="T15_700">시작일자</Text>
            <Input.Date
              asChild
              name="startDate"
              value={dayjs(dayoff.startDate).format("YYYY-MM-DD")}
              onChange={changeInputHandler}
            >
              <BaseInput />
            </Input.Date>
          </VStack>

          <VStack css={{ gap: 13 }}>
            <div>종료일자</div>
            <Input.Date
              asChild
              type="date"
              name="endDate"
              value={dayjs(dayoff.endDate).format("YYYY-MM-DD")}
              onChange={changeInputHandler}
            >
              <BaseInput />
            </Input.Date>
          </VStack>

          <VStack css={{ gap: 13 }}>
            <div>사유</div>
            <Input.Text
              asChild
              name="reason"
              value={dayoff.reason}
              onChange={changeInputHandler}
            >
              <BaseInput />
            </Input.Text>
          </VStack>
        </VStack>

        <CurrentStatus>
          <HStack css={{ jc: "space-between", rmb: 6 }}>
            <Text shape="T14_600">보유연차</Text>
            <Text shape="T14_600">8.5일</Text>
          </HStack>

          <HStack css={{ jc: "space-between", rmb: 6 }}>
            <Text shape="T14_600">차감연차</Text>
            <Text shape="T14_600" color="red500">
              -1일
            </Text>
          </HStack>
          <Divider />

          <HStack css={{ jc: "space-between" }}>
            <Text shape="T15_700">잔여연차</Text>
            <Text shape="T15_700">7.5일</Text>
          </HStack>

          <Space
            css={{
              rmt: 24,
            }}
          >
            <ButtonStyle.Primary
              shape="large"
              onClick={() => submitDayoffHandler(dayoff)}
            >
              신청하기
            </ButtonStyle.Primary>
          </Space>
        </CurrentStatus>
      </Container>
    </>
  );
};

export default DayoffAddPage;

const StyledSelect = styled("select", {
  border: "1px solid #ddd",
  width: "100%",
  height: 46,
});

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
