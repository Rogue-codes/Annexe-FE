import { useState } from "react";
import Sort from "../../components/sorting/Sort";
import LatestAuction from "../HOME/LatestAuction";
import Hero from "./Hero";
import Tabs from "./Tabs";

interface IAuctions {
  label?: string;
  hideTab?: boolean;
}
const tabArr = ["All Auction", "Upcoming Auction", "Current Auction"];
export default function Auctions({ hideTab, label }: IAuctions) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="w-full">
      <Hero label={label || "AUCTIONS"} />
      <div className="w-full py-12 bg-white ">
        {!hideTab && (
          <Tabs
            options={tabArr}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        )}
        <Sort />
        <LatestAuction label="" />
      </div>
    </div>
  );
}
