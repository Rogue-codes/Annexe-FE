import ModalWrapper from "../../components/modal/ModalWrapper";
import { IUser } from "../../interfaces/user.interface";
import UserForm from "./forms/UserForm";
import AddressForm from "./forms/AddressForm";
import BankForm from "./forms/BankForm";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState } from "react";

interface IAccountSettings {
  user: IUser;
}

export default function AccountSettings({ user }: IAccountSettings) {
  const [selected, setSelected] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleEditForm = (value: "personal" | "address" | "bank") => {
    setSelected(value);
    setShowModal(true);
  };

  const userObject = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    isActive: user?.isActive,
  }
  return (
    <div className="w-full py-12 flex flex-row flex-wrap gap-5 justify-start items-center">
      <div className="w-[48%] p-8 text-[#323232] h-[314px] border border-[#D9D9D9]">
        <h1 className=" text-lg font-bold mb-6">Personal Info</h1>

        <div className="flex justify-start items-center gap-4 my-5">
          <p className="font-bold">First name</p>
          <p>{user.firstName}</p>
        </div>

        <div className="flex justify-start items-center gap-4 my-5">
          <p className="font-bold">Last name</p>
          <p>{user.lastName}</p>
        </div>

        <div className="flex justify-start items-center gap-4 my-5">
          <p className="font-bold">Email</p>
          <p>{user.email}</p>
        </div>

        <div className="flex justify-start items-center gap-4 my-5">
          <p className="font-bold">Status</p>
          <p>{user.isActive ? "Active" : "Inactive"}</p>
        </div>

        <div className="w-full flex justify-end">
          <button
            className="py-2 px-6 border-2 hover:bg-[#004663] hover:text-white cursor-pointer transition-all"
            onClick={() => handleEditForm("personal")}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="w-[48%] p-8 text-[#323232] h-[314px] border border-[#D9D9D9]">
        <h1 className=" text-lg font-bold mb-6">Shipping info & address</h1>

        <div className="flex justify-start items-center gap-4 my-5">
          <p className="font-bold">Country</p>
          <p>{user.country}</p>
        </div>

        <div className="flex justify-start items-center gap-4 my-5">
          <p className="font-bold">State</p>
          <p>{user.state}</p>
        </div>

        <div className="flex justify-start items-center gap-4 my-5">
          <p className="font-bold">Address</p>
          <p>{user.address}</p>
        </div>

        <div className="w-full flex justify-end">
          <button
            className="py-2 px-6 border-2 hover:bg-[#004663] hover:text-white cursor-pointer transition-all"
            onClick={() => handleEditForm("address")}
          >
            Edit
          </button>
        </div>
      </div>

      <div className="w-[48%] p-8 text-[#323232] h-[314px] border border-[#D9D9D9]">
        <h1 className=" text-lg font-bold mb-6">Bank Account info</h1>

        <div className="flex justify-start items-center gap-4 my-5">
          <p className="font-bold">Account name</p>
          <p>{user.bankDetails[0].accountName}</p>
        </div>

        <div className="flex justify-start items-center gap-4 my-5">
          <p className="font-bold">Account number</p>
          <p>{user.bankDetails[0].accountNumber}</p>
        </div>

        <div className="flex justify-start items-center gap-4 my-5">
          <p className="font-bold">Bank</p>
          <p>{user.bankDetails[0].bank.bankName}</p>
        </div>

        <div className="w-full flex justify-end">
          <button
            className="py-2 px-6 border-2 hover:bg-[#004663] hover:text-white cursor-pointer transition-all"
            onClick={() => handleEditForm("bank")}
          >
            Edit
          </button>
        </div>
      </div>

      {showModal && (
        <ModalWrapper>
          <div className="relative p-12 bg-white w-[43vw]">
            <IoMdCloseCircleOutline
              className="absolute top-5 right-6 cursor-pointer"
              color="black"
              size={45}
              onClick={() => setShowModal(false)}
            />
            {selected === "personal" && <UserForm userObject={userObject} setSelected={setSelected} setShowModal={setShowModal} />}
            {selected === "address" && <AddressForm />}
            {selected === "bank" && <BankForm />}
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}
