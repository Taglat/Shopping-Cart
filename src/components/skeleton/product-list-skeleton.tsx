import React from "react";
import Skeleton from "./skeleton";

interface ProductListSkeletonProps {
 count?: number;
 className?: string;
}

const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({
 count = 8,
 className = "",
}) => {
 return (
   <div
     className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
   >
     {Array.from({ length: count }).map((_, index) => (
       <div
         key={index}
         className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
       >
         {/* Image skeleton */}
         <div className="aspect-square">
           <Skeleton height="100%" className="rounded-none" />
         </div>
         
         {/* Content skeleton */}
         <div className="p-4 space-y-3">
           <Skeleton height="0.875rem" width="40%" />
           <Skeleton height="1rem" width="90%" />
           <Skeleton height="1rem" width="70%" />
           <Skeleton height="1rem" width="60%" />
           <Skeleton height="1rem" width="50%" />
           <Skeleton height="2.5rem" className="rounded-md" />
         </div>
       </div>
     ))}
   </div>
 );
};

export default ProductListSkeleton;