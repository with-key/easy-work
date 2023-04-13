import { useRouter } from "next/router";

// 현재 pathname을 기준으로 상위 pathname을 구하는 함수
export const getSupPathname = (currentPathName: string, additional?: string) =>
  currentPathName
    .split("/")
    .filter((el) => el !== "")
    .slice(0, -1)
    .concat(additional ?? [])
    .reduce((acc, cur) => ((acc = acc + "/" + cur), acc), "");

export const useAppRouter = () => {
  const router = useRouter();

  // 상위 pathname으로 이동
  const goUpPath = () => {
    return router.push({
      pathname: getSupPathname(router.pathname),
      // query: router.query,
    });
  };

  const id = router.query.id?.toString();

  return {
    ...router,
    goUpPath,
    id,
  };
};
