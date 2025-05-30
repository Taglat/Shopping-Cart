import React, { useState } from "react";

interface AddToCartButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  className = "",
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = async () => {
    if (disabled || loading) return;

    setIsAdding(true);
    onClick && onClick();

    // Reset animation after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const buttonText = () => {
    if (disabled) return "Out of Stock";
    if (loading) return "Adding...";
    if (isAdding) return "Added!";
    return "Add to Cart";
  };

  const buttonIcon = () => {
    if (loading) {
      return (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      );
    }

    if (isAdding) {
      return (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      );
    }

    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 00-.293.707V19a2 2 0 002 2h1M7 13v4a2 2 0 002 2h6M17 5v6a2 2 0 01-2 2H9a2 2 0 01-2-2V5"
        />
      </svg>
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm
        transition-all duration-200 transform
        ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : isAdding
            ? "bg-green-600 text-white scale-95"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95"
        }
        ${className}
      `}
    >
      {buttonIcon()}
      <span>{buttonText()}</span>
    </button>
  );
};

export default AddToCartButton;
