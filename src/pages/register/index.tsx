import React, { ChangeEvent, useState } from "react";
import { styled } from "@styles/stitches.config";

import { useCreateUser } from "@apis/hooks/auth/auth";
import type { User } from "@typings/user/user.type";

const RegisterPage = () => {
  const [user, setUser] = useState<User>({
    email: "root@atnp.co.kr",
    password: "gsg9717**",
  });

  const { mutate, isLoading, isSuccess, isIdle } = useCreateUser();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <div>
      <div>회원가입</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate(user);
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
        <StyleButton>회원가입</StyleButton>
      </form>
    </div>
  );
};

export default RegisterPage;

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
