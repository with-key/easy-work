import React, { ChangeEvent, useState } from "react";
import { styled } from "@styles/stitches.config";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import Text from "@components/core/text";
import * as Header from "@components/core/header";
import * as Input from "@components/core/input";
import * as Select from "@components/core/select";
import { HStack, VStack } from "@components/core/stack";
import { Space } from "@components/core/space";

import { BaseInput } from "@components/template/input";
import { PrimarySelect } from "@components/template/select";

import { DayoffCategory } from "@prisma/client";
import { useGoDayoff } from "@apis/repositories/dayoff/useGoDayoff";
import { StyledButtons } from "@components/template/button";
import { ButtonImpl } from "@components/core/button";

// services
import { useCalculateDayoffService } from "@apis/services/calculateDayoff.service";

// type
import type { CreateDayoffPayload } from "@typings/dayoff/dayoff.type";
import GoDayoffDialog from "@features/dayoff/user/alertContainer/GoDayoffDialog";

const DayoffAddPage = () => {
  const router = useRouter();
  const useDayoff = useGoDayoff();

  const [dayoff, setDayoff] = useState<CreateDayoffPayload>({
    category: "Full",
    startDate: new Date(),
    endDate: new Date(),
    reason: "개인사유",
  });

  const { dayoffStatus, dayoffStatusIsLoading } = useCalculateDayoffService({
    startDate: dayjs(dayoff.startDate).format("YYYY-MM-DD"),
    endDate: dayjs(dayoff.endDate).format("YYYY-MM-DD"),
  });

  const chanegeDayoffCategoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDayoff((pre) => ({ ...pre, category: value as DayoffCategory }));
  };

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setDayoff((pre) => ({ ...pre, [name]: value }));
  };

  const chagneEndDateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDayoff((pre) => ({ ...pre, endDate: new Date(value) }));
  };

  return (
    <>
      <Header.Root>
        <Header.LeftSlot
          onClick={() => {
            return router.push(".");
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
              onChange={chagneEndDateHandler}
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
            <Text shape="T14_600">
              {dayoffStatusIsLoading ? "계산 중" : dayoffStatus?.hasDays}
            </Text>
          </HStack>

          <HStack css={{ jc: "space-between", rmb: 6 }}>
            <Text shape="T14_600">차감연차</Text>
            <Text shape="T14_600" color="red500">
              {dayoffStatusIsLoading ? "계산 중" : dayoffStatus?.count}
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
            <GoDayoffDialog payload={dayoff}>
              <ButtonImpl asChild>
                <StyledButtons.Primary shape="big02">
                  신청하기
                </StyledButtons.Primary>
              </ButtonImpl>
            </GoDayoffDialog>
          </Space>
        </CurrentStatus>
      </Container>
    </>
  );
};

export default DayoffAddPage;

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
