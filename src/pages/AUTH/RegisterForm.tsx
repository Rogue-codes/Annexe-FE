import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import { fb_, google } from "../../assets";

export interface ILoginForm {
  email: string;
  password: string;
}

interface IRegisterForm{
  setIsRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>
}
export default function RegisterForm({setIsRegisterSuccess}:IRegisterForm) {
  const {
    // setValue,
    // watch,
    // register,
    control,
    // formState: { isValid },
    // reset,
  } = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <div className="w-[27rem]">
      <p className="text-3xl font-bold py-6">Register</p>
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

      <p className="w-[90%] mt-9">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.</p>

      <div className="mt-16 flex justify-between items-center">
        <button className="border-2 py-3 px-6 hover:bg-[#004663] cursor-pointer hover:text-white transition-all" onClick={()=>setIsRegisterSuccess(true)}>
        Register
        </button>
      </div>

      <div className="mt-12">
        <button className="flex gap-5 justify-start items-center py-3 px-6 bg-[#2668CB]">
            <img src={fb_} alt="" />
            <p className="text-white font-bold">Register with Facebook</p>
        </button>

        <button className="flex mt-6 gap-5 justify-start items-center py-3 px-6 bg-[#C34444]">
        <img src={google} alt="" />
        <p className="text-white font-bold">Register with Google</p>
        </button>
      </div>
    </div>
  );
}
