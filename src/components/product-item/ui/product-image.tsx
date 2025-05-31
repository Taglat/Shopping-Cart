import React, { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = "",
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center opacity-30">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m15 13-3 3-3-3"
              />
            </svg>
          </div>
          <p className="text-xs opacity-50">Image not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse rounded opacity-10" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className={`object-cover transition-opacity duration-200 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default ProductImage;
