import React, { ChangeEvent, useState } from "react";
import { styled } from "@styles/stitches.config";

import type { User } from "@typings/user/user.type";

const LoginPage = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div>
      <div>로그인</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <StyledInput
          type="text"
          value={user.email}
          name="email"
          onChange={changeHandler}
        />
        <StyledInput
          type="text"
          value={user.password}
          name="password"
          onChange={changeHandler}
        />
        <StyleButton>로그인</StyleButton>
      </form>
    </div>
  );
};

export default LoginPage;

const StyledInput = styled("input", {
  width: "100%",
  border: "1px solid #333",
  height: 48,
});

const StyleButton = styled("button", {
  border: "1px solid #333",
  width: "100%",
  height: 40,
});
