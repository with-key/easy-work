import React, { PropsWithChildren } from "react";
import { useMutation } from "@tanstack/react-query";
import { styled } from "@styles/stitches.config";

import Text from "@components/core/text";
import * as Alert from "@components/template/alert";

import { HStack } from "@components/Stack";
import { Space } from "@components/Space";
import { Button } from "@components/core/button";
import { DialogButton } from "@components/template/button";

const CancelDayoffAlert = ({ children }: PropsWithChildren) => {
  const { mutate, status, reset } = useMutation({
    mutationFn: async () => {
      return;
    },
  });

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
                          해당 휴가를 취소하시겠습니까?
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
                        <Button asChild>
                          <DialogButton dir="left" negative>
                            아니오
                          </DialogButton>
                        </Button>
                      </Alert.Cancel>
                      <Button
                        asChild
                        onClick={() => {
                          mutate();
                        }}
                      >
                        <DialogButton dir="right">휴가 취소</DialogButton>
                      </Button>
                    </HStack>
                  </>
                );

              case "success":
                return (
                  <>
                    <StyledContent>
                      <Text shape="T17_700" align="center">
                        휴가를 신청하였습니다.
                      </Text>
                    </StyledContent>
                    <Alert.Cancel
                      asChild
                      onClick={() => {
                        return reset();
                      }}
                    >
                      <Button asChild>
                        <DialogButton size="full">확인</DialogButton>
                      </Button>
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
