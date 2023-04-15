import React, { PropsWithChildren } from "react";
import { styled } from "@styles/stitches.config";

import { useAlterDayoffStatus } from "@apis/repositories/dayoff/admin/useAlterDayoffStatus";

import * as Alert from "@components/template/alert";
import Text from "@components/core/text";

import { HStack } from "@components/core/stack";
import { ButtonImpl } from "@components/core/button";
import { StyledDialogButton } from "@components/template/button";

const RejectedDayoffDialog = ({ children }: PropsWithChildren) => {
  const alterDayoff = useAlterDayoffStatus();

  return (
    <Alert.Root>
      <Alert.Trigger asChild>{children}</Alert.Trigger>
      <Alert.Portal>
        <Alert.Overlay />
        <Alert.Content>
          {(() => {
            switch (alterDayoff.status) {
              case "idle":
                return (
                  <>
                    <Container>
                      <Text shape="T15_700">휴가를 반려하시겠습니까?</Text>
                    </Container>
                    <HStack>
                      <Alert.Cancel asChild>
                        <ButtonImpl>
                          <StyledDialogButton negative>취소</StyledDialogButton>
                        </ButtonImpl>
                      </Alert.Cancel>
                      <ButtonImpl
                        onClick={() => {
                          alterDayoff.alterDayoffStaus({
                            status: "Rejected",
                          });
                        }}
                      >
                        <StyledDialogButton dir="right">
                          반려
                        </StyledDialogButton>
                      </ButtonImpl>
                    </HStack>
                  </>
                );

              case "loading":
                return;

              case "success":
                return (
                  <>
                    <Container>
                      <Text shape="T15_700">신청된 휴가를 반려하였습니다.</Text>
                    </Container>
                    <Alert.Cancel asChild>
                      <ButtonImpl
                        onClick={() => {
                          alterDayoff.invalidateDayoff();
                        }}
                      >
                        <StyledDialogButton shape="full">
                          확인
                        </StyledDialogButton>
                      </ButtonImpl>
                    </Alert.Cancel>
                  </>
                );

              default:
                <></>;
            }
          })()}
        </Alert.Content>
      </Alert.Portal>
    </Alert.Root>
  );
};

export default RejectedDayoffDialog;

const Container = styled("div", {
  rpy: 20,
  rpx: 20,
  borderBottom: "1px solid $gary02",
  borderRadius: "10px 10px 0 0",
  width: 316,
  height: 100,
  display: "flex",
  ai: "center",
  jc: "center",
  bc: "white",
});
