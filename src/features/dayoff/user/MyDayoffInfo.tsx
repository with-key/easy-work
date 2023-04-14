import React from "react";
import Text from "@components/core/text";
import { HStack } from "@components/core/stack";
import { ButtonImpl } from "@components/core/button/index";
import { StyledButtons } from "@components/template/button";
import { Space } from "@components/core/space";
import { useRouter } from "next/router";

const MyDayoffInfo = () => {
  const router = useRouter();
  return (
    <div>
      <Space css={{ rmb: 25 }}>
        <Text shape="T34_800">Day Off</Text>
      </Space>

      <Space css={{ rmb: 5 }}>
        <Text shape="T15_600">나의 잔여 연차</Text>
      </Space>

      <HStack css={{ jc: "space-between" }}>
        <HStack css={{ ai: "end", gap: 2 }}>
          <Text shape="T34_800">8.5</Text>
          <Text shape="T15_700">일</Text>
        </HStack>

        <ButtonImpl asChild onClick={() => router.push("dayoff/add")}>
          <StyledButtons.Secondary shape="smallShort">
            연차쓰기
          </StyledButtons.Secondary>
        </ButtonImpl>
      </HStack>
    </div>
  );
};

export default MyDayoffInfo;
