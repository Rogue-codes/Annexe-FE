import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Iinput {
  label: string;
  control: Control<any, any>;
  name: any;
  type?: string;
  disable?: boolean;
}
export default function Input({ label, control, name, type, disable }: Iinput) {
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
            className=" disabled:opacity-50  disabled:cursor-not-allowed px-4 pb-3 w-full border-b-2 mt-2 bg-white focus:outline-none"
            type={type ? inputType : "text"}
            name=""
            id=""
            disabled={disable ? disable : false}
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
