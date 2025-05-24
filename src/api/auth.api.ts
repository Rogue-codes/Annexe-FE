/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRegisterForm } from "../pages/AUTH/Register";
import { IVerificationForm } from "../pages/AUTH/AccountVerification";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_APP_API_URL + "";

export const authApi = createApi({
  reducerPath: "authApi",
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
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation<any, IRegisterForm>({
      query: (payload) => {
        return {
          url: `/user/register`,
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

export const { useRegisterMutation, useVerifyUserMutation, useLoginMutation, useCompleteRegistrationMutation, useUpdateUserMutation } =
  authApi;
