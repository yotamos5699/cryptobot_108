import Router from "next/router";
import { useRouter } from "next/router";

export const updateRouterData = (data: any) => {
  Router.push(data);
};

export const getRouterData = (key?: string) => {
  const router = useRouter();
  return router.query;
};
