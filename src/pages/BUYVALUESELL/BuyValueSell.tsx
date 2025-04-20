import { useState } from "react";
import Tabs from "../AUCTIONS/Tabs";
import Hero from "./Hero";
import Content from "./Content";
import { Vector1, Vector2, Vector3, Vector4, Vector5, cloud } from "../../assets";
import Register from "./Register";
import FAQAccordion from "../../components/accordion/Accordion";

const tabArr = ["Bid your item", "Become a Seller"];
export default function BuyValueSell() {
  const [activeTab, setActiveTab] = useState(0);
  const contentArr = [
    {
        img:Vector1,
        label:"Register your account on the website"
    },
    {
        img:Vector2,
        label:"Complete your info and shipping address"
    },
    {
        img:activeTab === 0 ? Vector3 : cloud,
        label:activeTab === 0 ? "Bid your selected item to win" : "Upload your work and we will get your valuation"
    },
    {
        img:activeTab === 0 ? Vector4 : Vector3,
        label: activeTab === 0 ? "Complete the payment" : "Wait for the auction to be finished"
    },
    {
        img:activeTab === 0 ? Vector5 : Vector4,
        label:activeTab === 0 ? "The item will be shipped to your designated location" : "Get paid for your work based on the highest bid"
    },
  ]
  return (
    <div className="w-full h-full bg-white">
      <Hero />

      <div className="w-full mt-36 py-12">
        <Tabs
          options={tabArr}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Content contentArr={contentArr} activeTab={activeTab}/>
        <Register activeTab={activeTab}/>
        <FAQAccordion/>
      </div>
    </div>
  );
}
