import React, { PropsWithChildren } from "react";
import { styled } from "@styles/stitches.config";

import * as Alert from "@components/template/alert";
import Text from "@components/core/text";

import { HStack } from "@components/core/stack";
import { ButtonImpl } from "@components/core/button";
import { StyledDialogButton } from "@components/template/button";
import { useGoDayoff } from "@apis/repositories/dayoff/useGoDayoff";
import { CreateDayoffPayload } from "@typings/dayoff/dayoff.type";
import { useAppRouter } from "@hooks/useAppRouter";

type Props = {
  payload: CreateDayoffPayload;
} & PropsWithChildren;

const GoDayoffDialog = ({ children, payload }: Props) => {
  const router = useAppRouter();
  const goDayoff = useGoDayoff();

  return (
    <Alert.Root>
      <Alert.Trigger asChild>{children}</Alert.Trigger>
      <Alert.Portal>
        <Alert.Overlay />
        <Alert.Content>
          {(() => {
            switch (goDayoff?.status) {
              case "idle":
                return (
                  <>
                    <Container>
                      <Text shape="T15_700">휴가를 신청하시겠습니까?</Text>
                    </Container>
                    <HStack>
                      <Alert.Cancel asChild>
                        <ButtonImpl>
                          <StyledDialogButton negative>취소</StyledDialogButton>
                        </ButtonImpl>
                      </Alert.Cancel>
                      <ButtonImpl
                        onClick={() => {
                          goDayoff.mutate(payload);
                        }}
                      >
                        <StyledDialogButton dir="right">
                          승인
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
                      <Text shape="T15_700" align="center">
                        휴가 신청이 완료되었습니다.
                        <Text shape="T14_400" align="center" color="gary06">
                          관리자의 승인을 기다려주세요.
                        </Text>
                      </Text>
                    </Container>
                    <Alert.Cancel asChild>
                      <ButtonImpl
                        onClick={() => {
                          router.goUpPath();
                        }}
                      >
                        <StyledDialogButton shape="full">
                          확인
                        </StyledDialogButton>
                      </ButtonImpl>
                    </Alert.Cancel>
                  </>
                );

              case "error":
                return (
                  <>
                    <Container>
                      <Text shape="T15_700" align="center">
                        에러가 발생했습니다.
                        <Text shape="T14_400" align="center" color="red500">
                          {goDayoff.error?.message}
                        </Text>
                      </Text>
                    </Container>
                    <Alert.Cancel asChild>
                      <ButtonImpl
                        onClick={() => {
                          goDayoff.reset();
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

export default GoDayoffDialog;

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
