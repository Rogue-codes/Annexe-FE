import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { ILoginForm } from "../../pages/AUTH/LoginForm";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Iinput {
  label: string;
  control: Control<ILoginForm, any>;
  name: any;
  type?: string;
}
export default function Input({ label, control, name, type }: Iinput) {
  const [inputType, setInputType] = useState(type);

  return (
    <div className="relative">
      <label htmlFor="" className="block">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
            className=" px-4 pb-3 w-[27rem] border-b-2 mt-2 bg-white focus:outline-none"
            type={type ? inputType : "text"}
            name=""
            id=""
          />
        )}
      />

      {type && (
        <p
          className="absolute cursor-pointer top-8 right-4"
          onClick={() => setInputType(inputType === "password" ? "text" : type)}
        >
          {inputType === "text" ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </p>
      )}
    </div>
  );
}
