import { any, z } from "zod";
import { checkIfAdmin, getPlans } from "../helper";
import axios from "axios";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
const api_url = "http://0.0.0.0:8000/";
const get_users_url =
  "https://script.google.com/macros/s/AKfycbzh0Jz267JZ_HXGatrE-oJj8fwPHqXAn3G_UkVJX8EJj8m7jSStWeTwa9wHXbFTEVx1Lw/exec?type=getdata";

const getPythonApi = async (key: string, url_extention: string) => {
  const U = api_url + url_extention + "/" + key ?? "";
  console.log({ U });
  return await axios
    .get(U, { withCredentials: true })
    .then((res) => res.data)
    .catch((e) => console.log({ e }));
};

const getUsersData = async (key: string) => {
  const U = get_users_url + key ?? "";
  console.log({ U });
  return await axios
    .get(U, { withCredentials: true })
    .then((res) => res.data)
    .catch((e) => console.log({ e }));
};

const marketData = z.object({
  orderBy: z.enum([
    "market_cap_desc",
    "gecko_desc",
    "gecko_asc",

    "market_cap_asc",
    "market_cap_desc",
    "volume_asc",
    "volume_desc",
    "id_asc",
    "id_desc",
  ]),
  withHistory: z.boolean(),
  resultsAmount: z.number(),
  resultPages: z.number(),
  timeJump: z.enum(["1h", "24h", "7d", "14d", "30d", "200d", "1y"]),
});

const getMarketTop30 = async (params: z.infer<typeof marketData>) => {
  {
    console.log({ params });
    return await axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=${params.orderBy}&per_page=${params.resultsAmount}&page=${params.resultPages}&sparkline=${params.withHistory}&price_change_percentage=${params.timeJump}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log("res data ", res.data);
        return res.data;
      })
      .catch((error) => console.log({ error }));
  }
};

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `שלום ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  getPlans: protectedProcedure.query(async () => {
    return await getPlans();
  }),
  isAdmin: publicProcedure
    .input(z.object({ password: z.string(), toFetch: z.boolean() }))
    .query(async ({ input }) => {
      let res = input.toFetch ? await checkIfAdmin(input.password) : false;

      return { data: res };
    }),

  getMarketData: publicProcedure.input(marketData).query(async ({ input }) => {
    let res = await getMarketTop30(input);

    return { data: res };
  }),
  getActions: publicProcedure
    .input(z.object({ key: z.string(), url_extention: z.string() }))
    .query(async ({ input }) => {
      let res: any = await getPythonApi(input.key, input.url_extention);
      return { data: res };
    }),
  getUsersData: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      let res: any = await getUsersData(input.key);
      console.log({ res });
      return { data: res };
    }),
});
