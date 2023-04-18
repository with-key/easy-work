import React from "react";
import { styled } from "@styles/stitches.config";
import Text from "@components/core/text";
import { HStack, VStack } from "@components/core/stack";
import { useAppRouter } from "@hooks/useAppRouter";
import { adminPageUrl } from "@apis/url/admin";
import { ClientPendingDayoff } from "@apis/repositories/dayoff/admin/useGetPendingStatus";

type Props = {
  pending: ClientPendingDayoff;
};

const PendingDayoffCard = ({ pending }: Props) => {
  const { id, category, createAt, name } = pending;

  const router = useAppRouter();

  return (
    <CardContainer
      onClick={() => {
        return router.push(adminPageUrl.dayoff.pendingStatusDetail(id));
      }}
    >
      <VStack>
        <Text shape="T15_600">{category}</Text>
        <HStack css={{ ai: "center", gap: 8 }}>
          <Text shape="T13_500">{name}</Text>
          <Vertical />
          <Text shape="T13_400">{createAt}</Text>
        </HStack>
      </VStack>
    </CardContainer>
  );
};

export default PendingDayoffCard;

const CardContainer = styled("div", {
  rpy: 12,
  borderBottom: "1px solid $gary02",
});

const Vertical = styled("div", {
  height: 10,
  width: 1,
  bc: "$gary05",
});
