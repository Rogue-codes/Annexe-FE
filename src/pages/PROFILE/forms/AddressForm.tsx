/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Select from "../../../components/select/Select";
import { nigeriaStates } from "../../../utils";
import { useUpdateUserMutation } from "../../../api/auth.api";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { updateUser } from "../../../config/authSlice";

interface IAddressForm {
  stateObj: { state: string; city: string };
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AddressForm({
  stateObj,
  setSelected,
  setShowModal,
}: IAddressForm) {
  const [selectedState, setSelectedState] = useState<any>("");
  const [address, setAddress] = useState(stateObj?.city);

  const [updateUser_, { isLoading }] = useUpdateUserMutation();

  const dispatch = useDispatch();

  const updateUserBank = () => {
    // reset();
    updateUser_({
      state: selectedState.value,
      address,
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

  const handleSubmit_ = (e: any) => {
    e.preventDefault();
    updateUserBank();
  };

  return (
    <div className="pt-6">
      AddressForm
      <div>
        <form action="" onSubmit={handleSubmit_}>
          <Select
            options={nigeriaStates}
            value={selectedState.value}
            onChange={(value) => setSelectedState(value)}
            loading={false}
            placeholder="Select State"
          />
          <div className=" mt-5">
            <label htmlFor="">Address</label>
            <textarea
              name=""
              rows={6}
              id=""
              className="w-full mt-2 p-4 border-2 focus:outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          <div className="w-full p-3 mt-6 flex justify-end items-center">
            <button
              type="submit"
              // disabled={isLoading || !isValid || !isDirty}
              className="py-2 px-6 border-2 hover:bg-[#004663] hover:text-white cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Modify"}
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}
