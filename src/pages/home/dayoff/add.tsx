import React, { ChangeEvent, useState } from "react";
import { CreateDayoffPayload } from "@typings/dayoff/dayoff.type";
import { DayoffCategory } from "@prisma/client";
import { styled } from "@styles/stitches.config";
import axios from "axios";

const DayoffAddPage = () => {
  const [dayoff, setDayoff] = useState<CreateDayoffPayload>({
    category: "Full",
    startDate: "2023-01-01",
    endDate: "2023-01-02",
    reason: "개인사유",
  });

  const chanegeDayoffCategoryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDayoff((pre) => ({ ...pre, category: value as DayoffCategory }));
  };

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setDayoff((pre) => ({ ...pre, [name]: value }));
  };

  const submitDayoffHandler = async () => {
    const data = await axios.post("/api/dayoff", dayoff);
    console.log(data);
  };

  return (
    <div>
      <div>휴가종류</div>
      <StyledSelect
        value={dayoff.category}
        onChange={chanegeDayoffCategoryHandler}
      >
        <option value={DayoffCategory.Full}>연차</option>
        <option value={DayoffCategory.AmHalf}>오전반차</option>
        <option value={DayoffCategory.PmHalf}>오후반차</option>
      </StyledSelect>

      <div>시작일자</div>
      <StyledInput
        type="date"
        name="startDate"
        value={dayoff.startDate}
        onChange={changeInputHandler}
      />

      <div>종료일자</div>
      <StyledInput
        type="date"
        name="startDate"
        value={dayoff.endDate}
        onChange={changeInputHandler}
      />

      <div>사유</div>
      <StyledInput
        type="text"
        name="reason"
        value={dayoff.reason}
        onChange={changeInputHandler}
      />
      <StyledButton onClick={submitDayoffHandler}>신청하기</StyledButton>
    </div>
  );
};

export default DayoffAddPage;

const StyledInput = styled("input", {
  border: "1px solid #ddd",
  width: "100%",
  height: 46,
});

const StyledSelect = styled("select", {
  border: "1px solid #ddd",
  width: "100%",
  height: 46,
});

const StyledButton = styled("button", {
  border: "1px solid #ddd",
  width: "100%",
  height: 46,
});
