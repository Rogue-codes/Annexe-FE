import { useState } from "react";
import { reg } from "../../assets";
import Sidebar from "./Sidebar";
import OrderTable from "./OrderTable";
import BidTable from "./BidTable";
import AccountSettings from "./AccountSettings";
import { useSelector } from "react-redux";

const profileTabs = [
  "Transaction History",
  "Bidding History",
  "Auction History",
  "Account Settings",
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);

  const user = useSelector((state:any)=>state.auth.user)
  return (
    <div>
      <div className="relative h-[20rem] w-full">
        <div className="absolute w-full h-full left-0 top-0">
          <img src={reg} className="w-full h-full object-cover" alt="" />
        </div>

        <h1 className="text-7xl relative pt-54 pl-16 font-bold text-white">
          My account
        </h1>
      </div>

      <div className="w-full mt-9 h-[60vh] flex">
        <Sidebar
          tabs={profileTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="w-[70vw] overflow-y-scroll px-8 pt-6">
          {activeTab === 0 && <OrderTable />}
          {activeTab === 1 && <BidTable />}
          {activeTab === 2 && <BidTable />}
          {activeTab === 3 && <AccountSettings user={user} />}
        </div>
      </div>
    </div>
  );
}
