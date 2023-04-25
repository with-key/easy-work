import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { styled } from "@styles/stitches.config";

import Text from "@components/core/text";
import DefaultLayout from "@components/template/layout/DefaultLayout";
import * as Header from "@components/core/header";
import { Space } from "@components/core/space";
import { HStack } from "@components/core/stack";

import { useAppRouter } from "@hooks/useAppRouter";
import { ButtonImpl } from "@components/core/button";
import { StyledButtons } from "@components/template/button";
import GoDayoffDialog from "@features/dayoff/user/alertContainer/GoDayoffDialog";

const HomeMainPage = () => {
  const router = useAppRouter();

  // const directGoDayoff = (category: DayoffCategory) => {
  //   return {
  //     category,
  //     reason: "개인사유",
  //     startDate: new Date(),
  //     endDate: new Date(),
  //   };
  // };

  return (
    <>
      <Header.Root>
        <Header.LeftSlot>알림</Header.LeftSlot>
        <Header.RightSlot>메뉴</Header.RightSlot>
      </Header.Root>
      <DefaultLayout>
        <Space>
          <Space css={{ rmb: 14 }}>
            <Avatar />
          </Space>
          <Space css={{ rmb: 5 }}>
            <Text shape="T26_800">안녕하세요 With!</Text>
          </Space>
          <Text shape="T15_400" color="gary06">
            개발팀 Frontend Developer
          </Text>
        </Space>
        <Space>
          <PageButton onClick={() => router.push("/home/dayoff")}>
            <Text shape="T20_800">Day Off</Text>
            <div>{">"}</div>
          </PageButton>
          <HStack css={{ gap: 11 }}>
            {/* <GoDayoffDialog payload={directGoDayoff("AmHalf")}>
              <DirectDayoffButton>
                <Text shape="T15_700" color="gary01">
                  오전반차
                </Text>
              </DirectDayoffButton>
            </GoDayoffDialog>
            <GoDayoffDialog payload={directGoDayoff("PmHalf")}>
              <DirectDayoffButton>
                <Text shape="T15_700" color="gary01">
                  오후반차
                </Text>
              </DirectDayoffButton>
            </GoDayoffDialog>
            <GoDayoffDialog payload={directGoDayoff("Full")}>
              <DirectDayoffButton>
                <Text shape="T15_700" color="gary01">
                  일일연차
                </Text>
              </DirectDayoffButton>
            </GoDayoffDialog> */}
          </HStack>
          <PageButton>
            <Text shape="T20_800">ATNP Point </Text>
            <div>{">"}</div>
          </PageButton>
          <ATNPPointCard>
            <Space css={{ rmb: 16 }}>
              <Text shape="T15_600" color="gary01">
                잔여 포인트
              </Text>
              <Text as="span" shape="T26_800" color="gary01">
                135,234
              </Text>
              <Text as="span" shape="T15_700" color="gary01">
                ATP
              </Text>
            </Space>
            <HStack css={{ gap: 11 }}>
              <ButtonImpl>
                <StyledButtons.Primary shape="small01" css={{ bc: "$blue400" }}>
                  기록하기
                </StyledButtons.Primary>
              </ButtonImpl>
              <ButtonImpl>
                <StyledButtons.Primary shape="small01" css={{ bc: "$blue400" }}>
                  내역보기
                </StyledButtons.Primary>
              </ButtonImpl>
            </HStack>
          </ATNPPointCard>
        </Space>
        <Space css={{ rpy: 15 }}></Space>
      </DefaultLayout>
    </>
  );
};

export default HomeMainPage;

const PageButton = styled("button", {
  all: "unset",
  width: "100%",
  height: 30,
  rpy: 20,
  rmt: 20,
  display: "flex",
  ai: "center",
  jc: "space-between",
});

const DirectDayoffButton = styled("div", {
  width: "100%",
  bc: "$blue400",
  height: 150,
  display: "flex",
  ai: "center",
  jc: "center",
  borderRadius: 333,
});

const Avatar = styled("div", {
  width: 50,
  height: 50,
  bc: "$gary07",
  borderRadius: 333,
});

const ATNPPointCard = styled("div", {
  width: 315,
  rpy: 24,
  rpx: 27,
  bc: "$blue500",
  borderRadius: 20,
});
