import { eye, paint, picfram } from "../../assets";
import BidTable from "../../components/table/BidTable";
import Timer from "../../components/timer/Timer";
import LatestAuction from "../HOME/LatestAuction";

export default function Auction() {
  return (
    <div className="pb-24">
      <div className="flex justify-center gap-8 items-start px-14">
        <div className="w-1/2 ">
          <div className="h-[33rem] w-full">
            <img src={paint} className="w-full h-full object-cover" alt="" />
          </div>

          <div className="w-full mt-6 flex justify-start items-center gap-8">
            <div className="w-[13rem] h-[13rem]">
              <img
                src={picfram}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="w-[13rem] h-[13rem]">
              <img src={paint} className="w-full h-full object-cover" alt="" />
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <h1 className="text-7xl font-bold">Artstage</h1>
          <p className="text-2xl italic">
            by <b>Jose Guillermo</b>
          </p>
          <p className="text-2xl  text-[#2490BD] mt-7">
            current bid: <b className="font-bold">$700</b>
          </p>

          <div className="mt-16">
            <Timer />
          </div>

          <div className="border-b border-black pb-6">
            <p className="text-md mt-16">
              <b>Auction ends:</b> 16.4.2023 08:05:33 GMT+8
            </p>
          </div>

          <p className="text-lg font-bold mt-16 mb-4">Your bid</p>

          <div className="flex justify-start gap-5 items-center">
            <p className="font-bold">$</p>
            <div className="w-[103px] h-[43px] border-2">
              <input
                type="number"
                min={0}
                className="w-full px-4 h-full focus:outline-none"
              />
            </div>

            <button className="w-[61px] font-bold h-[43px] border-2">
              Bid
            </button>
          </div>

          <div className="flex justify-start items-center gap-10 mt-14">
            <div>
              <img src={eye} alt="" />
            </div>
            <div>
              <p className="text-lg font-bold">Add to watchlist</p>
              <p>10 Users watching</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 px-14">
        <div className="w-full border-b border-black">
          <div className="w-24 border-b-4 border-black">
            <p className="text-3xl font-bold">Bids</p>
          </div>
        </div>

        <BidTable />
      </div>

      <LatestAuction label="Other Auction" />
    </div>
  );
}
