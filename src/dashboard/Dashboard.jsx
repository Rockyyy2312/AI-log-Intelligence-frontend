import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-full p-8 md:p-12 relative">
        <div className="max-w-7xl mx-auto space-y-8 pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
