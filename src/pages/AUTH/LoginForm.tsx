import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import { fb_, google } from "../../assets";
import { paths } from "../../path/path";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/auth.api";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { loginUser } from "../../config/authSlice";

export interface ILoginForm {
  email: string;
  password: string;
}
export default function LoginForm() {
  const {
    handleSubmit,
    control,
    // formState: { isValid },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation();

  const handleVerifyBusiness = (values: ILoginForm) => {
    login(values)
      .unwrap()
      .then((res) => {
        enqueueSnackbar(res.message, { variant: "success" });
        dispatch(
          loginUser({
            user: res.data,
            access_token: res?.accessToken,
          })
        );
        navigate(paths.PROFILE);
      })
      .catch((err) => {
        enqueueSnackbar(err?.data?.message, { variant: "error" });
      });
  };

  return (
    <div className="">
      <p className="text-3xl font-bold py-6">Sign in</p>
      <form action="" onSubmit={handleSubmit(handleVerifyBusiness)}>
            <div className="mt-5">
        <Input name="email" control={control} label="Email address" />
      </div>

      <div className="mt-16">
        <Input
          name="password"
          control={control}
          label="Password"
          type="password"
        />
      </div>

      <div className="mt-16 w-full flex justify-between items-center">
        <button
          className="border-2 py-3 px-6 hover:bg-[#004663] cursor-pointer hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          sign in
        </button>

        <p className="font-bold hover:scale-105 transition-all cursor-pointer">
          Lost your password
        </p>
      </div>
      </form>
  

      <div>
        <p className="w-[80%] mt-12 mb-5">
          Use a social account for faster login or easy registration.
        </p>
        <button className="flex gap-5 justify-start items-center py-3 px-6 bg-[#2668CB]">
          <img src={fb_} alt="" />
          <p className="text-white font-bold">Login with Facebook</p>
        </button>

        <button className="flex mt-6 gap-5 justify-start items-center py-3 px-6 bg-[#C34444]">
          <img src={google} alt="" />
          <p className="text-white font-bold">Login with Google</p>
        </button>
      </div>
    </div>
  );
}
