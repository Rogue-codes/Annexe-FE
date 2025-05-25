import { useDispatch } from "react-redux";
import { user__ } from "../../assets";
import { FaArrowRight } from "react-icons/fa6";
import { logoutUser } from "../../config/authSlice";
import { useNavigate } from "react-router-dom";
import { paths } from "../../path/path";
import { IProfileTabs } from "./Profile";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { useState } from "react";

interface ISidebar {
  tabs: IProfileTabs[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setActiveChild: React.Dispatch<React.SetStateAction<number | null>>;
  showChildren: boolean;
  activeChild: number | null;
}
export default function Sidebar({
  tabs,
  activeTab,
  setActiveTab,
  setActiveChild,
  showChildren,
  activeChild
}: ISidebar) {
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
          <div>
            {" "}
            <div
              key={index}
              className={`${
                activeTab === index
                  ? "pl-8 text-[#004663] font-bold"
                  : "pl-0 text-[#323232] font-medium"
              } flex justify-start gap-2  items-center pb-9 cursor-pointer transition-all`}
              onClick={() => setActiveTab(index)}
            >
              {activeTab === index && <FaArrowRight size={25} />}
              <p className="text-2xl">{tab.label}</p>
              {index === 2 && (
                <>
                  {showChildren ? (
                    <FaAngleDown size={30} />
                  ) : (
                    <FaAngleRight size={30} />
                  )}
                </>
              )}
            </div>
            {showChildren && tab.children && tab.children.length > 0 && (
              <div className="w-[400px] ml-24 -mt-8 mb-5">
                {index === 2 &&
                  tab?.children &&
                  tab?.children?.length > 0 &&
                  tab.children?.map((child, childIndex) => (
                    <div
                      className="mb-2"
                      key={childIndex}
                      onClick={() => setActiveChild(childIndex)}
                    >
                      <p
                        className={`${
                          activeChild === childIndex
                            ? "font-bold text-[#004663]"
                            : "font-medium text-[#323232]"
                        } text-lg`}
                      >
                        {child.label}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
