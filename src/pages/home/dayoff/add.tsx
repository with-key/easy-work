import React, { useState } from "react";
import { CreateDayoffPayload } from "@typings/dayoff/dayoff.type";

const DayoffAddPage = () => {
  const [dayoff, setDayoff] = useState<CreateDayoffPayload>({
    startDate: "",
    endDate: "",
    reason: "",
  });
  return (
    <div>
      <div>휴가종류</div>
      <select name="">
        <option value="">연차</option>
        <option value="">오전반차</option>
        <option value="">오후반차</option>
      </select>
    </div>
  );
};

export default DayoffAddPage;
