import React, { ChangeEvent, useState } from "react";
import { styled } from "@styles/stitches.config";

import type { User } from "@typings/user/user.type";
import { StyledButtons } from "@components/template/button";

import Text from "@components/core/text";
import * as InputImpl from "@components/core/input";
import { BaseInput } from "@components/template/input";
import { VStack } from "@components/core/stack";
import LoginDialog from "@features/dayoff/auth/login/LoginDialog";
import axios from "axios";

const LoginPage = () => {
  const [user, setUser] = useState<User>({
    email: "root@atnp.co.kr",
    password: "gsg9717**",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <Container>
      <LogoContainer>Atnp</LogoContainer>
      <VStack css={{ gap: 13, rmb: 20 }}>
        <Text shape="T15_700">ID</Text>
        <InputImpl.Text
          asChild
          type="text"
          value={user.email}
          name="email"
          onChange={changeHandler}
        >
          <BaseInput />
        </InputImpl.Text>
      </VStack>
      <VStack css={{ gap: 13, rmb: 40 }}>
        <Text shape="T15_700">PW</Text>
        <InputImpl.Password
          asChild
          value={user.password}
          name="password"
          onChange={changeHandler}
        >
          <BaseInput />
        </InputImpl.Password>
      </VStack>
      <LoginDialog payload={user}>
        <StyledButtons.Primary shape="big02">LOGIN</StyledButtons.Primary>
      </LoginDialog>
    </Container>
  );
};

export default LoginPage;

const LogoContainer = styled("div", {
  height: 295,
  display: "flex",
  ai: "center",
  jc: "center",
});

const Container = styled("div", {
  rpx: 30,
  rpy: 20,
});
