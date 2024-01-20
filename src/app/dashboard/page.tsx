import AppCard from "@/components/app-card";
import ProjectDialog from "@/components/deploy-form";
import DashboardCards from "@/components/suspense/dashboard-card-collection";
import DashboardFallback from "@/components/suspense/dashboard-fallback";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getServerAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
const Dashboard = async () => {
  const session = await getServerAuth();
  if (!session) redirect("/login");
  return (
    <main className="px-4 md:px-20 py-32  lg:flex-row  gap-x-36 gap-y-5">
      <div className="flex items-center justify-between w-full pb-10 gap-10 max-sm:flex-col">
        <h1 className="text-3xl font-cal">Your Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">New Project</Button>
          </DialogTrigger>
          <ProjectDialog />
        </Dialog>
      </div>
      <Suspense fallback={<DashboardFallback />}>
        <DashboardCards />
      </Suspense>
    </main>
  );
};
export default Dashboard;
