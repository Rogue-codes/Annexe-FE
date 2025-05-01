import { useDispatch } from "react-redux";
import { user__ } from "../../assets";
import { FaArrowRight } from "react-icons/fa6";
import { logoutUser } from "../../config/authSlice";
import { useNavigate } from "react-router-dom";
import { paths } from "../../path/path";

interface ISidebar {
  tabs: string[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
export default function Sidebar({ tabs, activeTab, setActiveTab }: ISidebar) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-[30vw] h-full shadow-2xl p-8">
      <div className="flex justify-start items-start gap-6 border-b-2 pb-5">
        <div className="w-[100px] h-[100px] rounded-full border">
          <img src={user__} className="w-full h-full " alt="" />
        </div>
        <div>
          <div>
            <p className="text-3xl font-bold">John Appleseed</p>
            <p className="text-[#A4A4A4]">john.appleseed@gmail.com</p>
          </div>

          <p
            className="text-2xl text-[#C53232] font-bold mt-4 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              dispatch(logoutUser());
              navigate(paths.HOME);
            }}
          >
            Logout
          </p>
        </div>
      </div>
      <div className="pt-12">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${
              activeTab === index
                ? "pl-8 text-[#004663] font-bold"
                : "pl-0 text-[#323232] font-medium"
            } flex justify-start gap-2 items-center pb-9 cursor-pointer transition-all`}
            onClick={() => setActiveTab(index)}
          >
            {activeTab === index && <FaArrowRight size={25} />}
            <p className="text-2xl">{tab}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
