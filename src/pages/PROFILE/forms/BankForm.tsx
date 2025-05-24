/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Input from "../../../components/input/Input";
import Select from "../../../components/select/Select";
import {
  useGetBanksQuery,
  useResolveBankAccountQuery,
} from "../../../api/bank.api";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../api/auth.api";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../config/authSlice";

interface IBankDetails {
  accountNumber: string;
  accountName: string;
  bank: {
    bankName: string;
    bankCode: string;
  };
}

interface IBankForm {
  userBankObject: {
    accountNumber: string;
    accountName: string;
    bank: {
      id: string | undefined;
      label: string;
      value: string;
    };
  };
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function BankForm({
  userBankObject,
  setSelected,
  setShowModal,
}: IBankForm) {
  const {
    setValue,
    watch,
    handleSubmit,
    control,
    // formState: { isValid },
  } = useForm<IBankDetails>({
    defaultValues: {
      accountNumber: "",
      accountName: "",
      bank: {
        bankName: "",
        bankCode: "",
      },
    },
  });

  const formVal = watch();

  const [selectedBank, setSelectedBank] = useState<any>("");
  const [validate, setValidate] = useState<boolean>(false);
  const { data: banks, isLoading: fetchingBanks } = useGetBanksQuery({});
  const {
    data: account,
    isLoading: fetchingAccount,
    isSuccess: hasResolvedAccount,
  } = useResolveBankAccountQuery(
    {
      account_number: formVal.accountNumber,
      bank_code: selectedBank.value,
    },
    {
      skip: !validate,
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
    if (userBankObject) {
      setValue("accountNumber", userBankObject.accountNumber);
      setValue("accountName", userBankObject.accountName);
      setSelectedBank({
        id: userBankObject.bank.id,
        label: userBankObject.bank.label,
        value: userBankObject.bank.value,
      });
    }
  }, [userBankObject, setValue]);

  useEffect(() => {
    if (hasResolvedAccount) {
      setValue("accountNumber", account.data.account_number);
      setValue("accountName", account?.data?.account_name);
      setValue("bank", {
        bankCode: selectedBank.value,
        bankName: selectedBank.label,
      });
    }
  }, [account]);

  const [updateUser_, { isLoading }] = useUpdateUserMutation();

  const dispatch = useDispatch();

  const updateUserBank = (values: any) => {
    // reset();
    updateUser_({
      bankDetails: [
        {
          accountNumber: values.accountNumber,
          accountName: values.accountName,
          bank: {
            bankName: selectedBank.label,
            bankCode: selectedBank.value,
          },
        },
      ],
    })
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        dispatch(
          updateUser({
            user: res?.data,
          })
        );
        setSelected("");
        setShowModal(false);
      })
      .catch((err) => {
        enqueueSnackbar(err?.data?.message, { variant: "error" });
      });
  };

  const handleSubmit_ = (values: any) => {
    if (!hasResolvedAccount) {
      setValidate(true);
    } else {
      updateUserBank(values);
    }
  };

  return (
    <div>
      BankForm
      <form action="" onSubmit={handleSubmit(handleSubmit_)}>
        <div className="w-full flex justify-between items-start">
          <div className="w-[48%] mt-1">
            <Input
              name={"accountNumber"}
              label="Account Number"
              control={control}
            />
            <div>
              {hasResolvedAccount && (
                <div className="w-full text-sm p-3 bg-gray-300 mt-3">
                  <div>
                    <p>
                      Name: <strong>{formVal.accountName}</strong>
                    </p>
                    <p>
                      Account: <strong>{formVal.accountNumber}</strong>
                    </p>
                  </div>
                  <p>
                    Bank: <strong>{formVal.bank.bankName}</strong>
                  </p>
                </div>
              )}
            </div>
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
        <div className="w-full p-3 mt-6 flex justify-end items-center">
          <button
            type="submit"
            // disabled={isLoading || !isValid || !isDirty}
            className="py-2 px-6 border-2 hover:bg-[#004663] hover:text-white cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {fetchingAccount
              ? "Validating..."
              : isLoading
              ? "Loading..."
              : !hasResolvedAccount
              ? "Validate"
              : "Modify"}
          </button>{" "}
        </div>
      </form>
    </div>
  );
}
