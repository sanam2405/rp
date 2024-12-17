import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import { Skeleton } from "./ui/skeleton";

export const CarouselSkeleton = () => {
  return (
    <div className="flex justify-center items-center h-screen p-4 drop-shadow-xl overflow-hidden">
      <Card className="w-full max-w-lg flex flex-col shadow-2xl max-h-[90vh]">
        <div className="flex-grow shadow-md">
          <CardHeader
            avatar={<Skeleton className="h-10 w-10 rounded-full" />}
            title={<Skeleton className="h-4 w-24" />}
            subheader={<Skeleton className="h-3 w-32 mt-2" />}
          />
          <Skeleton className="h-96 w-full" />
        </div>
        <CardActions disableSpacing>
          <Skeleton className="h-8 w-8 rounded-full mx-2" />
          <Skeleton className="h-8 w-8 rounded-full mx-2" />
          <Skeleton className="h-8 w-8 rounded-full mx-2" />
        </CardActions>
        <CardContent>
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    </div>
  );
};
