import React, { PropsWithChildren } from "react";
import { useMutation } from "@tanstack/react-query";
import { styled } from "@styles/stitches.config";

import Text from "@components/core/text";
import * as Alert from "@components/template/alert";

import { HStack } from "@components/core/stack";
import { Space } from "@components/core/space";
import { ButtonImpl } from "@components/core/button";
import { StyledDialogButton } from "@components/template/button";
import { useDeleteDayoff } from "@apis/repositories/dayoff/all/useDeleteDayoff";
import { useAppRouter } from "@hooks/useAppRouter";

const CancelDayoffAlert = ({ children }: PropsWithChildren) => {
  const router = useAppRouter();
  const { deleteDayoff, status } = useDeleteDayoff();

  return (
    <Alert.Root>
      <Alert.Trigger asChild>{children}</Alert.Trigger>
      <Alert.Portal>
        <Alert.Overlay />
        <Alert.Content>
          {(() => {
            switch (status) {
              case "idle":
                return (
                  <>
                    <StyledContent>
                      <Space css={{ rmb: 16 }}>
                        <Text shape="T17_700" css={{ textAlign: "center" }}>
                          이 휴가를 삭제하시겠습니까?
                        </Text>
                      </Space>
                      <Row>
                        <Text shape="T13_500">신청자</Text>
                        <Text shape="T13_500">James</Text>
                      </Row>
                      <Row>
                        <Text shape="T13_500">작성일</Text>
                        <Text shape="T13_500">James</Text>
                      </Row>
                      <Row>
                        <Text shape="T13_500">휴가종류</Text>
                        <Text shape="T13_500">James</Text>
                      </Row>
                      <Row>
                        <Text shape="T13_500">반차여부</Text>
                        <Text shape="T13_500">James</Text>
                      </Row>
                      <Row>
                        <Text shape="T13_500">시작일자</Text>
                        <Text shape="T13_500">James</Text>
                      </Row>
                      <Row>
                        <Text shape="T13_500">종료일자</Text>
                        <Text shape="T13_500">James</Text>
                      </Row>
                      <Row>
                        <Text shape="T13_500">사유</Text>
                        <Text
                          shape="T13_500"
                          css={{
                            maxWidth: 200,
                            textAlign: "right",
                          }}
                        >
                          James
                        </Text>
                      </Row>
                    </StyledContent>
                    <HStack>
                      <Alert.Cancel asChild>
                        <ButtonImpl asChild>
                          <StyledDialogButton dir="left" negative>
                            아니오
                          </StyledDialogButton>
                        </ButtonImpl>
                      </Alert.Cancel>
                      <ButtonImpl
                        asChild
                        onClick={() => {
                          deleteDayoff();
                        }}
                      >
                        <StyledDialogButton dir="right">
                          삭제
                        </StyledDialogButton>
                      </ButtonImpl>
                    </HStack>
                  </>
                );

              case "success":
                return (
                  <>
                    <StyledContent>
                      <Text shape="T17_700" align="center">
                        휴가를 삭제하였습니다.
                      </Text>
                    </StyledContent>
                    <Alert.Cancel asChild>
                      <ButtonImpl onClick={() => router.goUpPath()}>
                        <StyledDialogButton shape="full">
                          확인
                        </StyledDialogButton>
                      </ButtonImpl>
                    </Alert.Cancel>
                  </>
                );

              default:
                return null;
            }
          })()}
        </Alert.Content>
      </Alert.Portal>
    </Alert.Root>
  );
};

export default CancelDayoffAlert;

const StyledContent = styled("div", {
  bc: "White",
  width: 316,
  padding: "30px 25px",
  borderRadius: "20px 20px 0px 0px",
});

const Row = styled(HStack, {
  jc: "space-between",
  minHeight: 38,
  ai: "center",
  borderBottom: "$gary02 1px solid",

  "&:last-child": {
    borderBottom: "none",
  },
});
