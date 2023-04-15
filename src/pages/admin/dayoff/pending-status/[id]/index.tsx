import React from "react";
import { useAppRouter } from "@hooks/useAppRouter";
import { useGetPendingStatusId } from "@apis/repositories/dayoff/admin/useGetPendingStatusId";

import * as Header from "@components/core/header";
import { HStack } from "@components/core/stack";

import { ButtonImpl } from "@components/core/button";
import { StyledButtons } from "@components/template/button";

import DayoffDetail from "@features/dayoff/common/DayoffDetail";
import Loader from "@components/template/loader";
import Float from "@components/core/float";
import ApprovedDayoffDialog from "@features/dayoff/admin/pendingStatus/ApprovedDayoffDialog";
import RejectedDayoffDialog from "@features/dayoff/admin/pendingStatus/RejectedDayoffDialog";

const PendingDayoffPage = () => {
  const router = useAppRouter();
  const { pendingDayoff, isLoading } = useGetPendingStatusId();

  const approved = pendingDayoff.status === "승인";
  const rejected = pendingDayoff.status === "반려";

  return (
    <>
      <Header.Root>
        <Header.LeftSlot onClick={() => router.goUpPath()}>
          이전
        </Header.LeftSlot>
      </Header.Root>

      {isLoading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <>
          <DayoffDetail dayoff={pendingDayoff} />
          <Float>
            <HStack css={{ jc: "center", gap: 10 }}>
              <RejectedDayoffDialog>
                <ButtonImpl>
                  <StyledButtons.Reject shape="big02Half" disabled={rejected}>
                    반려하기
                  </StyledButtons.Reject>
                </ButtonImpl>
              </RejectedDayoffDialog>
              <ApprovedDayoffDialog>
                <ButtonImpl>
                  <StyledButtons.Primary shape="big02Half" disabled={approved}>
                    승인하기
                  </StyledButtons.Primary>
                </ButtonImpl>
              </ApprovedDayoffDialog>
            </HStack>
          </Float>
        </>
      )}
    </>
  );
};

export default PendingDayoffPage;
