import LoaderCard from "@/components/suspense/loader";

const DashboardFallback = () => {
  return (
    <section className="w-full ">
      <div className="grid max-[400px]:grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-5">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <LoaderCard key={i} />
          ))}
      </div>
    </section>
  );
};

export default DashboardFallback;
