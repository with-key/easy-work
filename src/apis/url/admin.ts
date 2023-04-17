export const adminPageUrl = {
  dayoff: {
    pendingStatus: "/admin/dayoff/pending-status",
    pendingStatusDetail: (id: string | undefined) =>
      `/admin/dayoff/pending-status/${id}`,
    userStatus: "/admin/dayoff/user-status",
    userStatusDetail: (id: string | number | undefined) =>
      `/admin/dayoff/user-status/${id}`,
  },
};
