import React from "react";

import { ButtonImpl } from "@components/core/button";
import { Space } from "@components/core/space";
import { StyledButtons, StyledDialogButton } from "@components/template/button";

const ButtonStory = () => {
  return (
    <Space css={{ padding: 20 }}>
      <ButtonImpl>
        <StyledButtons.Primary shape="big01">big01</StyledButtons.Primary>
      </ButtonImpl>
      <br />
      <ButtonImpl>
        <StyledButtons.Primary shape="big01" disabled>
          big01
        </StyledButtons.Primary>
      </ButtonImpl>
      <br />
      <ButtonImpl>
        <StyledButtons.Primary shape="big02">big02</StyledButtons.Primary>
      </ButtonImpl>
      <br />
      <ButtonImpl>
        <StyledButtons.Primary shape="big02" disabled>
          big02
        </StyledButtons.Primary>
      </ButtonImpl>
      <br />
      <ButtonImpl>
        <StyledButtons.Primary shape="big01Half">big02</StyledButtons.Primary>
      </ButtonImpl>
      <br />
      <ButtonImpl>
        <StyledButtons.Primary shape="middle">middle</StyledButtons.Primary>
      </ButtonImpl>
      <br />
      <ButtonImpl>
        <StyledButtons.Secondary shape="small01">
          small01
        </StyledButtons.Secondary>
      </ButtonImpl>
      <br />
      <ButtonImpl>
        <StyledButtons.Primary shape="small02">small02</StyledButtons.Primary>
      </ButtonImpl>
      <br />
      <ButtonImpl>
        <StyledButtons.Primary shape="small03">small03</StyledButtons.Primary>
      </ButtonImpl>
      <br />
      <ButtonImpl>
        <StyledButtons.Primary shape="small03">small03</StyledButtons.Primary>
      </ButtonImpl>
      <br />
      <ButtonImpl>
        <StyledDialogButton shape="half">취소</StyledDialogButton>
      </ButtonImpl>
      <ButtonImpl>
        <StyledDialogButton shape="half" dir="right">
          확인
        </StyledDialogButton>
      </ButtonImpl>
    </Space>
  );
};

export default ButtonStory;
