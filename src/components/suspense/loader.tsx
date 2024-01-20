import { Card, CardContent } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";
const LoaderCard = () => {
  return (
    <Card className="w-[400px] max-w-xs mx-auto overflow-hidden transition-all duration-200 rounded-lg shadow-lg sm:max-w-sm hover:shadow-xl">
      <Skeleton className="w-full " />
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
        <Skeleton className="w-1/3 h-6 mt-2" />
        <Skeleton className="w-full mt-2 h-9 " />
      </CardContent>
    </Card>
  );
};

export default LoaderCard;
