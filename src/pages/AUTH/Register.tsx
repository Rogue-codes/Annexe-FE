import { useState } from "react";
import { reg } from "../../assets";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import RegistrationSuccess from "./RegistrationSuccess";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { paths } from "../../path/path";
import { useRegisterMutation } from "../../api/auth.api";

export interface IRegisterForm {
  email: string;
  password: string;
}

export default function Register() {
  const [isRegisterSuccessful, setIsRegisterSuccess] = useState(false);
  const [register_, { isLoading, isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();
  const {
    // setValue,
    watch,
    // register,
    control,
    // reset,
    handleSubmit,
  } = useForm<IRegisterForm>({
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
  });

  const formVal = watch();
  console.log("formVal",formVal)

  const isValid = (): boolean => {
    return Boolean(formVal.email) && Boolean(formVal.password);
  }

  const onSubmit = () => {
    register_({ ...formVal })
      .unwrap()
      .then((res: any) => {
        enqueueSnackbar("Registration Successful", { variant: "success" });
        // navigate(`${paths.REGISTER}?verify=true`)
        // window.location.reload()
      })
      .catch((err: any) => {
        console.log(err);
        enqueueSnackbar(`${err?.data?.message}`, { variant: "error" });
      });
  };
  return (
    <div>
      <div className="relative h-[20rem] w-full">
        <div className="absolute w-full left-0 top-0">
          <img src={reg} className="w-full h-full object-cover" alt="" />
        </div>

        <h1 className="text-7xl relative pt-64 pl-16 font-bold text-white">
          Sign in / Register
        </h1>
      </div>
      {isSuccess ? (
        <RegistrationSuccess />
      ) : (
        <div>
          <div className="mt-16 mb-24 w-full flex gap-24 justify-center items-start px-44">
            <LoginForm />
            <div className="border  h-[80vh]"></div>
            <RegisterForm
              onSubmit={onSubmit}
              control={control}
              setIsRegisterSuccess={setIsRegisterSuccess}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              isValid={isValid}
            />
          </div>
        </div>
      )}
    </div>
  );
}
