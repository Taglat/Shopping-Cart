// components/hoc/withSkeleton.tsx
import React from "react";
import ProductListSkeleton from "../skeleton/product-list-skeleton";

interface WithSkeletonOptions {
  skeletonCount?: number;
  className?: string;
}

function withSkeleton<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  options: WithSkeletonOptions = {}
) {
  const { skeletonCount = 8, className = "" } = options;

  const WithSkeletonComponent: React.FC<T & { isLoading?: boolean }> = ({
    isLoading,
    ...props
  }) => {
    if (isLoading) {
      return <ProductListSkeleton count={skeletonCount} className={className} />;
    }

    return <Component {...(props as T)} />;
  };

  WithSkeletonComponent.displayName = `withSkeleton(${
    Component.displayName || Component.name
  })`;

  return WithSkeletonComponent;
}

export default withSkeleton;