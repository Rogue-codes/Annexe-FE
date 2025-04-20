import { reg } from "../../assets";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Register() {
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

      <div className="mt-16 mb-24 w-full flex gap-24 justify-center items-start px-44">
        <LoginForm />
        <div className="border  h-[80vh]"></div>
        <RegisterForm />
      </div>
    </div>
  );
}
