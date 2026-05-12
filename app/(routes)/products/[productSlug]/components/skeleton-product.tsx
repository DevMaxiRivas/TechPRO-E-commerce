import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProduct = () => {
    return (
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <div className="">
                <Skeleton className="px-5 h-50 w-full rounded-xl" />
            </div>
            <div className="sm:px-12 space-y-2">
                <Skeleton className="h-4 w-55" />
                <Skeleton className="h-4 w-50" />
                <Skeleton className="h-4 w-50" />
                <Skeleton className="h-4 w-50" />
            </div>
        </div>
    );
}

export default SkeletonProduct;