import React, { PropsWithChildren, useReducer } from "react";
import { styled } from "@styles/stitches.config";

import * as Alert from "@components/template/alert";
import { useMutation } from "@tanstack/react-query";
import { User } from "@typings/user/user.type";
import { apis } from "@apis/axios/instance";
import Text from "@components/core/text";
import { ButtonImpl } from "@components/core/button";
import { StyledDialogButton } from "@components/template/button";
import { useAppRouter } from "@hooks/useAppRouter";
import Loader from "@components/template/loader";

const LoginDialog = ({
  children,
  payload,
}: PropsWithChildren<{ payload: User }>) => {
  const router = useAppRouter();

  const { mutate, isLoading, status, error, reset } = useMutation({
    mutationFn: async (user: User) => {
      const { data } = await apis.post("/auth/login", user);
      console.log(data);
      return data;
    },
  });

  console.log(error);

  return (
    <Alert.Root>
      <Alert.Trigger
        asChild
        onClick={() => {
          mutate(payload, {
            onSuccess: () => {
              router.push("/home");
            },
          });
        }}
      >
        {children}
      </Alert.Trigger>

      <Alert.Portal>
        <Alert.Overlay />
        <Alert.Content>
          {(() => {
            switch (status) {
              case "error":
                return (
                  <>
                    <Container>
                      <Text shape="T15_700">로그인에 실패했습니다.</Text>
                    </Container>
                    <Alert.Cancel asChild>
                      <ButtonImpl onClick={() => reset()}>
                        <StyledDialogButton shape="full">
                          확인
                        </StyledDialogButton>
                      </ButtonImpl>
                    </Alert.Cancel>
                  </>
                );
              case "loading":
                return (
                  <LoaderContainer>
                    <Text shape="T15_700">로그인 중</Text>
                  </LoaderContainer>
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

export default LoginDialog;

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

const LoaderContainer = styled("div", {
  display: "flex",
  ai: "center",
  jc: "center",
  bc: "white",
  width: 316,
  height: 156,
  borderRadius: 10,
});
