import AppCard from "@/components/app-card";
import LoaderCard from "@/components/suspense/loader";
import { db } from "@/lib/db";

const DashboardCards = async () => {
  const projects = await db.application.findMany({});
  return (
    <section className="w-full ">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3">
        {projects.length === 0 ? (
          <h1>No Projects Hosted Yet</h1>
        ) : (
          projects.map((project, i) => <AppCard {...project} key={i} />)
        )}
      </div>
    </section>
  );
};

export default DashboardCards;
