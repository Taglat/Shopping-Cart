interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  className?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  currency = "$",
  className = "",
}) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-lg font-semibold text-gray-900">
        {currency}
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <span className="text-sm text-gray-500 line-through">
          {currency}
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
