import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { paths } from "../../path/path";

interface IPopupModal {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function PopupModal({setShowModal}:IPopupModal) {
  const navigate = useNavigate()
  return (
    <div className=" p-16 text-white relative z-[99999999999999] w-[60vw] primary-bg">
      <IoMdCloseCircleOutline
        className="absolute top-5 right-6 cursor-pointer"
        color="white"
        size={45}
        onClick={() => setShowModal(false)}
      />

      <p className="text-center text-3xl w-[50%] mx-auto">
        Register and complete your account info to get benefit of
      </p>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-4xl font-bold text-white">
            No Seller <br /> Commission
          </p>
          <p className="text-4xl mt-8">
            for your first <br /> sale
          </p>
        </div>

        <div>
          <div className="border-l h-[72px]"></div>
          <p className="text-lg font-bold -ml-2">or</p>
          <div className="border-l h-[72px]"></div>
        </div>

        <div>
          <p className="text-4xl font-bold text-white">
            No Seller <br /> Commission
          </p>
          <p className="text-4xl mt-8">
            for your first <br /> sale
          </p>
        </div>
      </div>

      <div className="flex mt-16 justify-center items-center">
        <Button
          onclick={() => navigate(paths.REGISTER)}
          className_="!mx-auto text-red-900"
          text="Sign up to Annexe Auction"
        />
      </div>
    </div>
  );
}
