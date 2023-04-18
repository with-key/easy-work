import React from "react";

import { useGetWorkingUsers } from "@apis/repositories/user/admin/useGetWorkingUsers";

const UserList = () => {
  const { users, isLoading } = useGetWorkingUsers();
  if (isLoading) return <div>로딩중</div>;
  return <div>UserList</div>;
};

export default UserList;
