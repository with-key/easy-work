import { SpecialDayoffCategory, Status } from "@prisma/client";
import { apis } from "./axios/instance";

export type SpecialDayoff = {
  category: SpecialDayoffCategory;
  createAt: string;
  days: number;
  endDate: string;
  id: number;
  startDate: string;
  status: Status;
  ticketId: number;
  updateAt: string;
  userId: number;
  year: number;
  user: {
    name: string;
  };
};

export type AddSpecialDayoffPayload = {
  category: SpecialDayoffCategory | "default";
  year: string;
  reason: string;
  startDate: Date;
  endDate: Date;
  startDateAt: "AM" | "PM";
  endDateAt: "AM" | "PM";
};

export const dayoffQueryKeys = {
  specialDayoffs: ["specialDayoffs"],
  pendingSpecialDayoffs: ["specialDayoffs", "pending"],
};

export const api = {
  admin: {
    get: {
      specialDayoffs: () => {
        return apis.get("/admin/special-dayoffs");
      },
    },
  },

  add: (payload: AddSpecialDayoffPayload) => {
    return apis.post("/special-dayoffs", payload);
  },
};
