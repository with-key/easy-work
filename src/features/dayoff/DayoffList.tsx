import React, { useState } from "react";
import { isEmpty, map, pipe, range, toArray } from "@fxts/core";
import dayjs from "dayjs";

import DayoffItem from "./DayoffItem";
import { useGetDayoffs } from "@apis/repositories/dayoff/useGetDayoffs";

import Text from "@components/core/text";
import { HStack } from "@components/Stack";
import * as Select from "@components/core/select";
import { styled } from "@styles/stitches.config";
import { Space } from "@components/Space";
import { typoes } from "@styles/typos";

const DayoffList = () => {
  const [year, setYear] = useState(dayjs().year());
  const dayoffQuery = useGetDayoffs(year);

  const years = pipe(
    range(5),
    map((el) => dayjs().year() - el),
    toArray
  );

  if (!dayoffQuery.data || dayoffQuery.isLoading) return null;
  const dayoffs = dayoffQuery.data.dayoffs;

  return (
    <>
      <HStack
        css={{
          jc: "space-between",
          rmb: 20,
        }}
      >
        <Text shape="T20_800">휴가내역</Text>
        <Select.Container
          asChild
          value={year}
          onChange={(e) => {
            console.log(e.target.value);
            setYear(+e.target.value);
          }}
        >
          <StyledSelect>
            {years.map((year) => (
              <Select.Item key={year} value={year}>
                {year}
              </Select.Item>
            ))}
          </StyledSelect>
        </Select.Container>
      </HStack>
      <Space>
        {isEmpty(dayoffs) ? (
          <EmptyContainer>
            <Text shape="T14_400" color="gary07">
              {year}년에 사용한 휴가가 없습니다.
            </Text>
          </EmptyContainer>
        ) : (
          dayoffs.map((el) => <DayoffItem key={el.id} dayoff={el} />)
        )}
      </Space>
    </>
  );
};

export default DayoffList;

const EmptyContainer = styled("div", {
  height: 180,
  display: "flex",
  jc: "center",
  ai: "center",
});

const StyledSelect = styled("select", {
  border: "none",
  ...typoes.T17_700,
});
