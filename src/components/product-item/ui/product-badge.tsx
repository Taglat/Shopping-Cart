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
          className: "opacity-90",
        };
      case "new":
        return {
          text: "New",
          className: "opacity-90",
        };
      case "hot":
        return {
          text: "Hot",
          className: "opacity-90",
        };
      case "out-of-stock":
        return {
          text: "Out of Stock",
          className: "opacity-70",
        };
      default:
        return {
          text: "",
          className: "opacity-70",
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
