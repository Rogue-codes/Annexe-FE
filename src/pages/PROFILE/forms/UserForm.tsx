import React from "react";
import { set, useForm } from "react-hook-form";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { useUpdateUserMutation } from "../../../api/auth.api";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../config/authSlice";

interface IPersonalData {
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
}

interface IUserForm {
  userObject: {
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
  };
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserForm({
  userObject,
  setSelected,
  setShowModal,
}: IUserForm) {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isValid, isDirty },
    reset,
  } = useForm<IPersonalData>({
    defaultValues: {
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      email: userObject.email,
      status: userObject.isActive,
    },
  });
  const formVal = watch();

  const [updateUser_, { isLoading, isSuccess }] = useUpdateUserMutation();

  const dispatch = useDispatch();

  const handleVerifyBusiness = (values: IPersonalData) => {
    reset();
    const { status, ...rest } = values;
    updateUser_({ ...rest, isActive: formVal.status })
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        dispatch(updateUser(res.data));
        setSelected("");
        setShowModal(false);
        console.log(res);
      })
      .catch((err) => {
        enqueueSnackbar(err?.data?.message, { variant: "error" });
      });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(handleVerifyBusiness)}>
        <div className="flex justify-between">
          <div className="w-[48%]">
            <Input name={"firstName"} label="First Name" control={control} />
          </div>

          <div className="w-[48%]">
            <Input name={"lastName"} label="Last Name" control={control} />
          </div>
        </div>

        <div className="w-full mt-6">
          <Input
            disable
            name={"email"}
            label="Email address"
            control={control}
          />
        </div>

        <div className="mt-5">
          <p className="text-sm mb-1">Status:</p>
          <div
            className={`${
              !formVal.status ? "bg-white]" : "bg-[#004663]"
            } transition-all relative w-16 h-6 rounded-xl border`}
          >
            <div
              className={`${!formVal.status ? "left-1" : "left-[65%]"} ${
                !formVal.status ? "bg-[#004663]" : "bg-white"
              } transition-all cursor-pointer w-5 h-5 top-[1px] absolute rounded-full border`}
              onClick={() => setValue("status", !formVal.status)}
            ></div>
          </div>
          <p className="text-xs text-red-400 mt-1">
            {!formVal.status && "Your account will become inActive"}
          </p>
        </div>

        <div className="w-full flex justify-end items-center">
          <button
            disabled={isLoading || !isValid || !isDirty}
            className="py-2 px-6 border-2 hover:bg-[#004663] hover:text-white cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Modify"}
          </button>
        </div>
      </form>
    </div>
  );
}
