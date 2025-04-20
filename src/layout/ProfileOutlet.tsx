import { Outlet } from "react-router-dom";
import AuthGuard from "./guard/AuthGuard";

export default function ProfileOutlet() {
  return (
    <div>
      <AuthGuard>
        <Outlet />
      </AuthGuard>
     
    </div>
  );
}
