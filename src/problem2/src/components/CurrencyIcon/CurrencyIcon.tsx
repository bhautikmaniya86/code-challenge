interface CurrencyIconProps {
  symbol: string;
  size?: number;
  className?: string;
}

export function CurrencyIcon({
  symbol,
  size = 24,
  className = "",
}: CurrencyIconProps) {
  return (
    <img
      key={symbol}
      src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${symbol}.svg`}
      alt={symbol}
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
