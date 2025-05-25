import { useEffect, useState } from "react";
import { reg } from "../../assets";
import Sidebar from "./Sidebar";
import OrderTable from "./OrderTable";
import BidTable from "./BidTable";
import AccountSettings from "./AccountSettings";
import { useSelector } from "react-redux";
import { set } from "react-hook-form";
import UploadAuction from "./UploadAuction";
import Earnings from "./Earnings";

export interface IProfileTabs{
  label: string;
  children?:{
    label: string;
    value: string;
  }[]
} 


const profileTabs:IProfileTabs[] = [
  {
    label:"Transaction History"
  },
  {
    label: "Bidding History"
  },
  {
    label:"Auction Management",
    children:[
      {
        label: "Auction History",
        value: "auction-history"
      },
      {
        label: "Upload Auction",
        value: "upload-auction"
      },
      {
        label: "Earning Report",
        value: "earning-report"
      }
    ]
  },
  {
    label: "Account Settings"
  }
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeChild, setActiveChild] = useState<null | number>(null);

  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    if( activeTab === 2 ){
      setShowChildren(true)
      setActiveChild(0)
    }else{
      setShowChildren(false)
    }
  }, [activeTab,setActiveTab]);

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
          setActiveChild={setActiveChild}
          showChildren={showChildren}
          activeChild={activeChild}
        />
        <div className="w-[70vw] overflow-y-scroll px-8 pt-6">
          {activeTab === 0 && <OrderTable />}
          {activeTab === 1 && <BidTable />}
          {activeChild === 0 && <BidTable />}
          {activeChild === 1 && <UploadAuction />}
          {activeChild === 2 && <Earnings />}
          {activeTab === 3 && <AccountSettings user={user} />}
        </div>
      </div>
    </div>
  );
}
