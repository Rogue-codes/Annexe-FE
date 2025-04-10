import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import AuthGuard from "./guard/AuthGuard";

export default function AppOutlet() {
  return (
    <div>
      <AuthGuard>
         <DashboardLayout>
        <Outlet />
      </DashboardLayout>
      </AuthGuard>
     
    </div>
  );
}
