import React from "react";
import * as Header from "@components/core/header";
import { Space } from "@components/Space";
import Text from "@components/core/text";
import { styled } from "@styles/stitches.config";

const HolidaysPage = () => {
  return (
    <div>
      <Header.Root>
        <Header.LeftSlot onClick={() => {}}>이전</Header.LeftSlot>
        <Header.RightSlot onClick={() => {}}>이전</Header.RightSlot>
      </Header.Root>
      <PageLayout>
        <Space css={{ rmb: 25 }}>
          <Text shape="T26_800">Day Off</Text>
        </Space>
      </PageLayout>
    </div>
  );
};

export default HolidaysPage;

const PageLayout = styled("section", {
  border: "1px solid red",
  height: "calc(100vh - 60px)",
  padding: "0 30px",
});
