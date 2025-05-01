import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const bankApi = createApi({
  reducerPath: "bankApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["bank"],
  endpoints: (builder) => ({
    getBanks: builder.query<
      any,
      any
    >({
      query: () => {
        return {
          url: `/bank/all?country=nigeria`,
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
    resolveBankAccount: builder.query<
    any,
    {account_number:string; bank_code:string}
  >({
    query: ({account_number,bank_code}) => {
      return {
        url: `/bank/resolve-account?account_number=${account_number}&bank_code=${bank_code}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
    },
  }),
    
  }),
});

export const { useGetBanksQuery,useResolveBankAccountQuery } = bankApi;