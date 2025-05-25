/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRegisterForm } from "../pages/AUTH/Register";
import { IVerificationForm } from "../pages/AUTH/AccountVerification";
import Cookies from "js-cookie";
import { paths } from "../path/path";
import { IAuction } from "../pages/PROFILE/UploadAuction";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const temp_token = Cookies.get("annexe-user-pending-registration");
    const token = Cookies.get("annexe-token");

    if (temp_token) {
      headers.set("Authorization", `Bearer ${temp_token}`);
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithLogout: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Optionally redirect
    window.location.href = paths.LOGIN;
  }

  return result;
};

export const auctionApi = createApi({
  reducerPath: "auctionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const temp_token = Cookies.get("annexe-user-pending-registration");
      const token = Cookies.get("annexe-token");
      if (temp_token) {
        headers.set("Authorization", `Bearer ${temp_token}`);
      }

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["auctions"],
  endpoints: (builder) => ({
    createAuction: builder.mutation<any, IAuction>({
      query: (payload) => {
        return {
          url: `/auction/create`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
    verifyUser: builder.mutation<any, { email: string; otp: string }>({
      query: (payload) => {
        return {
          url: `/user/verify`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    completeRegistration: builder.mutation<any, IVerificationForm>({
      query: (payload) => {
        return {
          url: `/user/complete-signup`,
          method: "PATCH",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    updateUser: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: `/user/update`,
          method: "PATCH",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),

    login: builder.mutation<any, { email: string; password: string }>({
      query: (payload) => {
        return {
          url: `user/login`,
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        };
      },
    }),
  }),
});

export const {
  useCreateAuctionMutation,
  useVerifyUserMutation,
  useLoginMutation,
  useCompleteRegistrationMutation,
  useUpdateUserMutation,
} = auctionApi;
