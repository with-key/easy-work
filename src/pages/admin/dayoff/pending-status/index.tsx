import React from "react";
import { Space } from "@components/core/space";
import * as Header from "@components/core/header";
import Text from "@components/core/text";
import { HStack } from "@components/core/stack";
import { useAppRouter } from "@hooks/useAppRouter";
import { adminPageUrl } from "@apis/url/admin";
import { isEmpty } from "@fxts/core";
import PendingDayoffCard from "@features/dayoff/admin/pendingStatus/PendingDayoffCard";
import { useGetPendingStatus } from "@apis/repositories/dayoff/admin/useGetPendingStatus";

const PendingStatusPage = () => {
  const { pendings } = useGetPendingStatus();
  const router = useAppRouter();

  return (
    <Space>
      <Header.Root>
        <Header.LeftSlot>이전</Header.LeftSlot>
        <Header.RightSlot>메뉴</Header.RightSlot>
      </Header.Root>

      <Space
        css={{
          height: "calc(100vh - 60px)",
          rpx: 30,
          rpt: 5,
        }}
      >
        <Space
          css={{
            rmb: 25,
          }}
        >
          <Text shape="T26_800">Day Off</Text>
        </Space>
        <HStack css={{ gap: 20 }}>
          <Text shape="T20_800">신청현황</Text>
          <Text
            shape="T20_800"
            color="gary06"
            onClick={() => router.push(adminPageUrl.dayoff.userStatus)}
          >
            휴가현황
          </Text>
        </HStack>

        {isEmpty(pendings) ? (
          <Space>
            <HStack css={{ ai: "center", jc: "center", height: 300 }}>
              <Text shape="T14_400" color="gary06">
                휴가신청 내역이 없습니다
              </Text>
            </HStack>
          </Space>
        ) : (
          <Space>
            {pendings?.map((dayoff) => {
              return <PendingDayoffCard key={dayoff.id} pending={dayoff} />;
            })}
          </Space>
        )}
      </Space>
    </Space>
  );
};

export default PendingStatusPage;
