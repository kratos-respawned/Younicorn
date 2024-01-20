import ProjectDialog from "@/components/deploy-form";
import DashboardFallback from "@/components/suspense/dashboard-fallback";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Suspense } from "react";

const Dashboard = () => {
  return (
    <main className="px-4 md:px-20 pt-32 flex-col lg:flex-row flex gap-x-36 gap-y-5">
      <div className="flex items-center justify-between w-full pb-10 max-sm:flex-col">
        <h1 className="text-3xl font-cal">Your Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Component</Button>
          </DialogTrigger>
          <ProjectDialog />
        </Dialog>
      </div>
      <Suspense fallback={<DashboardFallback />}>
        {/* <DashboardCards /> */}
      </Suspense>
    </main>
  );
};
export default Dashboard;
