/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { reg } from "../../assets";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "../../path/path";
import {
  useCompleteRegistrationMutation,
  useVerifyUserMutation,
} from "../../api/auth.api";
import { enqueueSnackbar } from "notistack";
import { IUser } from "../../interfaces/user.interface";
import Select from "../../components/select/Select";
import {
  useGetBanksQuery,
  useResolveBankAccountQuery,
} from "../../api/bank.api";
import Cookies from "js-cookie";

export interface IVerificationForm
  extends Omit<
    IUser,
    | "isVerified"
    | "isActive"
    | "isAdmin"
    | "isRegistrationComplete"
    | "email"
    | "recipientCode"
    | "country"
  > {
  // You can add any additional properties specific to IVerificationForm here
}
export default function AccountVerification() {
  const {
    setValue,
    watch,
    // register,
    handleSubmit,
    control,
    // formState: { isValid },
    // reset,
  } = useForm<IVerificationForm>({
    defaultValues: {
      address: "",
      city: "",
      phone: "",
      firstName: "",
      lastName: "",
      state: "",
      bankDetails: [
        {
          accountNumber: "",
          accountName: "",
          bank: {
            bankName: "",
            bankCode: "",
          },
        },
      ],
    },
  });

  const [params] = useSearchParams();

  const email: string = params.get("email") as string;
  const token: string = params.get("code") as string;

  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);

  const navigate = useNavigate();

  const [verifyBusiness, { isLoading, isSuccess }] = useVerifyUserMutation();
  const [
    completeRegistration,
    { isLoading: isCompletingRegistration, isSuccess: isRegistrationComplete },
  ] = useCompleteRegistrationMutation();

  const handleVerifyBusiness = () => {
    verifyBusiness({
      email,
      otp: token,
    })
      .unwrap()
      .then((res) => {
        Cookies.set("annexe-user-pending-registration", res.data.accessToken);
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(err?.data?.message, { variant: "error" });
      });
  };

  useEffect(() => {
    if (!!email || !!token) {
      handleVerifyBusiness();
    }
  }, [email, token]);

  const formVal = watch();


  const [selectedBank, setSelectedBank] = useState<any>("");
  const [showBankDetails, setShowBankDetails] = useState<boolean>(false);

  const { data: banks, isLoading: fetchingBanks } = useGetBanksQuery({});
  const {
    data: account,
    isLoading: fetchingAccount,
    isSuccess: hasResolvedAccount,
  } = useResolveBankAccountQuery(
    {
      account_number: formVal.bankDetails[0].accountNumber,
      bank_code: selectedBank.value,
    },
    {
      skip:
        !selectedBank || formVal.bankDetails[0].accountNumber?.length !== 10,
    }
  );

  const banksArray = banks?.data?.data?.map((bank: any) => {
    return {
      id: bank.id,
      label: bank.name,
      value: bank.code,
    };
  });

  useEffect(() => {
    if (hasResolvedAccount) {
      setValue("bankDetails", [
        {
          accountName: account?.data?.account_name,
          accountNumber: account?.data?.account_number,
          bank: {
            bankCode: selectedBank.value,
            bankName: selectedBank.label,
          },
        },
      ]);
    }
  }, [account]);

  const handleCompleteRegistration = (values: IVerificationForm) => {
    completeRegistration(values)
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
      })
      .catch((err: any) => {
        if (Array.isArray(err?.data?.message)) {
          err?.data?.message.map((err: string) => {
            return enqueueSnackbar(err, { variant: "error" });
          });
        } else {
          enqueueSnackbar(err?.data?.message, { variant: "error" });
        }
      });
  };

  useEffect(() => {
    if (isRegistrationComplete) {
      setIsVerificationSuccess(true);
    }
  }, [isRegistrationComplete]);

  return (
    <div className="mb-24">
      <div className="relative h-[23rem] w-full">
        <div className="absolute w-full left-0 top-0">
          <img src={reg} className="w-full h-full object-cover" alt="" />
        </div>

        <h1 className="text-7xl relative pt-48 pl-16 font-bold text-white">
          Complete info
        </h1>
      </div>

      {!isVerificationSuccess ? (
        <div className="px-44">
          <h1 className="text-3xl text-center py-16 font-bold">
            {isLoading ? "Loading..." : "Thank you for your verification"}
          </h1>

          <div className="px-12 primary-bg flex">
            <div className="border-dashed border-white pr-8 border-r-2">
              <h1 className="text-[180px] font-bold text-white">%</h1>
            </div>
            <div className="p-12">
              <p className="text-3xl text-white w-[60%]">
                Complete your account info to get benefit of
              </p>
              <div className="flex mt-6 justify-center items-center">
                <div>
                  <p className="text-[50px] text-white leading-12 font-bold w-[80%]">
                    10% off Buyer’s Premium{" "}
                  </p>
                </div>
                <div className="border-l-2 border-white pl-12">
                  <p className="text-4xl text-white">for your first purchase</p>
                </div>
              </div>
            </div>
          </div>

          {isSuccess && (
            <div className="px-24 my-12">
              <form
                action=""
                onSubmit={handleSubmit(handleCompleteRegistration)}
              >
                <div className="flex justify-between">
                  <div className="w-[48%]">
                    <Input
                      name={"firstName"}
                      label="First Name"
                      control={control}
                    />
                  </div>

                  <div className="w-[48%]">
                    <Input
                      name={"lastName"}
                      label="Last Name"
                      control={control}
                    />
                  </div>
                </div>

                <div className="w-full mt-6">
                  <Input
                    name={"phone"}
                    label="Phone Number (Whatsapp)"
                    control={control}
                  />
                </div>

                <h1 className="text-lg font-bold py-12">Bank Details</h1>

                <div className="w-full flex justify-between items-start">
                  <div className="w-[48%]">
                    <Input
                      name={"bankDetails[0].accountNumber"}
                      label="Account Number"
                      control={control}
                    />
                    {selectedBank &&
                    formVal.bankDetails[0].accountNumber?.length === 10 &&
                    fetchingAccount ? (
                      <p>Loading...</p>
                    ) : hasResolvedAccount ? (
                      <>
                        <button
                          type="button"
                          className="border py-1 px-4 text-xs rounded-lg text-gray-500 mt-2 cursor-pointer"
                          onClick={() => setShowBankDetails(!showBankDetails)}
                        >
                          {showBankDetails ? "hide" : "view"} account info
                        </button>
                        {showBankDetails && (
                          <div className="w-full text-sm p-3 bg-gray-300 mt-3">
                            <div>
                              <p>
                                Name:{" "}
                                <strong>
                                  {formVal.bankDetails[0].accountName}
                                </strong>
                              </p>
                              <p>
                                Account:{" "}
                                <strong>
                                  {formVal.bankDetails[0].accountNumber}
                                </strong>
                              </p>
                            </div>
                            <p>
                              Bank:{" "}
                              <strong>
                                {formVal.bankDetails[0].bank.bankName}
                              </strong>
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="w-[48%]">
                    {/* <Input name={""} label="Select Bank" control={control} /> */}
                    <Select
                      label="Select Bank"
                      options={banksArray}
                      value={selectedBank.value}
                      onChange={(value) => setSelectedBank(value)}
                      loading={fetchingBanks}
                    />{" "}
                  </div>
                </div>

                <h1 className="text-lg font-bold py-12">Shipping Details</h1>

                <div className="w-full flex justify-between items-center">
                  <div className="w-[48%]">
                    <Input
                      name={"address"}
                      label="Address 1"
                      control={control}
                    />
                  </div>

                  <div className="w-[48%]">
                    <Input name={"state"} label="State" control={control} />
                  </div>
                </div>

                <div className="w-full mt-16 flex justify-end">
                  <button
                    type="submit"
                    className="py-3 px-6 border-2 hover:bg-[#004663] font-bold cursor-pointer hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isCompletingRegistration}
                  >
                    {isCompletingRegistration ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className="px-44 my-24">
          <h1 className="text-3xl font-bold text-center mb-12">
            Thank you, check your email for the coupon
          </h1>
          <p className="text-lg w-[50%] text-center mx-auto">
            Thank you for completing your info, we have send you an email
            containing the coupon code that can be used to redeem the discounted
            price when you checkout
          </p>
          <div className="flex justify-center items-center gap-12 my-12">
            <button
              className="py-3 px-6 border-2 hover:bg-[#004663] hover:text-white transition-all cursor-pointer font-bold"
              onClick={() => navigate(paths.REGISTER)}
            >
              Create an Auction
            </button>
            <button
              className="py-3 px-6 border-2 hover:bg-[#004663] hover:text-white transition-all cursor-pointer font-bold"
              onClick={() => navigate(paths.AUCTIONS)}
            >
              Start bidding
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
