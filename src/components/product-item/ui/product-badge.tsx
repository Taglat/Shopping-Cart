interface ProductBadgeProps {
  type: "discount" | "new" | "hot" | "out-of-stock";
  value?: number;
  className?: string;
}

const ProductBadge: React.FC<ProductBadgeProps> = ({
  type,
  value,
  className = "",
}) => {
  const getBadgeConfig = () => {
    switch (type) {
      case "discount":
        return {
          text: value ? `-${Math.round(value)}%` : "Sale",
          className: "bg-red-500 text-white",
        };
      case "new":
        return {
          text: "New",
          className: "bg-green-500 text-white",
        };
      case "hot":
        return {
          text: "Hot",
          className: "bg-orange-500 text-white",
        };
      case "out-of-stock":
        return {
          text: "Out of Stock",
          className: "bg-gray-500 text-white",
        };
      default:
        return {
          text: "",
          className: "bg-gray-500 text-white",
        };
    }
  };

  const { text, className: badgeClassName } = getBadgeConfig();

  return (
    <span
      className={`
        inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold
        ${badgeClassName}
        ${className}
      `}
    >
      {text}
    </span>
  );
};

export default ProductBadge;
