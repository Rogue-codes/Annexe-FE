import { ReactNode } from "react";
import Nav from "../components/nav/Nav";
interface IDashboardLayout {
  children: ReactNode;
}
export default function DashboardLayout({ children }: IDashboardLayout) {
  return (
    <div className="w-full h-screen overflow-y-scroll bg-[#F4FBF7]">
      <div className="w-[calc(100vw-17vw)] pt-12 ml-[17vw] h-full  px-9">
        <Nav />
      {children}
      </div>
    </div>
  );
}
