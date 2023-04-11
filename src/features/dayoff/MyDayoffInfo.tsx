import React from "react";
import Text from "@components/core/text";
import { HStack } from "@components/Stack";
import { BaseButtonImple } from "@components/core/button/index";
import { Primary } from "@components/template/button";
import { Space } from "@components/Space";

const MyDayoffInfo = () => {
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

        <BaseButtonImple
          asChild
          onClick={() => {
            console.log("hello world!");
          }}
        >
          <Primary shape="smallShort">연차쓰기</Primary>
        </BaseButtonImple>
      </HStack>
    </div>
  );
};

export default MyDayoffInfo;
