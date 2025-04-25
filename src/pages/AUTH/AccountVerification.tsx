import { useEffect, useState } from "react";
import { reg } from "../../assets";
import Input from "../../components/input/Input";
import { ILoginForm } from "./LoginForm";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "../../path/path";
import { useVerifyUserMutation } from "../../api/auth.api";
import { enqueueSnackbar } from "notistack";

export default function AccountVerification() {
  const {
    // setValue,
    // watch,
    // register,
    handleSubmit,
    control,
    // formState: { isValid },
    // reset,
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [params] = useSearchParams();

  const email: string = params.get("email") as string;
  const token: string = params.get("code") as string;

  console.log("params", { email, token });

  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);

  const onSubmit = () => {
    setIsVerificationSuccess(true);
  };

  const navigate = useNavigate();

  const [verifyBusiness, { isLoading, isSuccess }] = useVerifyUserMutation();

  const handleVerifyBusiness = () => {
    verifyBusiness({
      email,
      otp: token,
    })
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        console.log(res);
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

  return (
    <div className="mb-24">
      <div className="relative h-[23rem] w-full">
        <div className="absolute w-full left-0 top-0">
          <img src={reg} className="w-full h-full object-cover" alt="" />
        </div>

        <h1 className="text-7xl relative pt-64 pl-16 font-bold text-white">
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
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between">
                  <div className="w-[48%]">
                    <Input name={""} label="First Name" control={control} />
                  </div>

                  <div className="w-[48%]">
                    <Input name={""} label="Last Name" control={control} />
                  </div>
                </div>

                <div className="w-full mt-6">
                  <Input name={""} label="Email Address" control={control} />
                </div>

                <div className="w-full mt-6">
                  <Input
                    name={""}
                    label="Phone Number (Whatsapp)"
                    control={control}
                  />
                </div>

                <h1 className="text-lg font-bold py-12">Bank Details</h1>

                <div className="w-full flex justify-between items-center">
                  <div className="w-[48%]">
                    <Input name={""} label="Account Number" control={control} />
                  </div>

                  <div className="w-[48%]">
                    <Input name={""} label="Select Bank" control={control} />
                  </div>
                </div>

                <h1 className="text-lg font-bold py-12">Shipping Details</h1>

                <div className="w-full flex justify-between items-center">
                  <div className="w-[48%]">
                    <Input name={""} label="Address 1" control={control} />
                  </div>

                  <div className="w-[48%]">
                    <Input name={""} label="Address 2" control={control} />
                  </div>
                </div>

                <div className="w-full mt-6 flex justify-between items-center">
                  <div className="w-[48%]">
                    <Input name={""} label="Country" control={control} />
                  </div>

                  <div className="w-[48%]">
                    <Input name={""} label="State" control={control} />
                  </div>
                </div>

                <div className="w-full mt-16 flex justify-end">
                  <button
                    type="submit"
                    className="py-3 px-6 border-2 hover:bg-[#004663] font-bold cursor-pointer hover:text-white transition-all"
                  >
                    Submit
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
