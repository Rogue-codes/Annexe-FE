import { ReactNode } from "react";
import Navbar from "../components/nav/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

interface IDashboardLayout {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IDashboardLayout) {
  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#F4FBF7]">
      <Sidebar />
      <div className="w-[calc(100vw-17vw)] pt-12 ml-[17vw] h-full  px-9">
        <Navbar />
      {children}
      </div>
    </div>
  );
}
