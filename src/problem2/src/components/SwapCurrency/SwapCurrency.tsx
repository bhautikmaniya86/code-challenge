import { useState, useEffect } from "react";

import { Loader2 } from "lucide-react";
import { Token } from "../../types/token";
import { fetchTokenPrices } from "../../api/tokens";
import { SwapForm } from "../../forms";
import { FormInputType } from "../../forms/SwapForm/SwapForm";

export function SwapCurrency() {
  const [currencies, setCurrencies] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConverting, setConverting] = useState(false);
  const [conversionResult, setConversionResult] = useState<{
    fromAmount: string;
    toAmount: string;
    fromSymbol: string;
    toSymbol: string;
    rate: number;
  } | null>(null);

  useEffect(() => {
    const loadCurrencies = async () => {
      setLoading(true);
      try {
        const prices = await fetchTokenPrices();
        const currencyList = Object.entries(prices)
          .map(([symbol, price]) => ({
            symbol,
            name: symbol,
            price,
          }))
          .filter((currency) => currency.price > 0)
          .sort((a, b) => a.symbol.localeCompare(b.symbol));
        setCurrencies(currencyList);
      } catch (error) {
        console.error("Error loading currencies:", error);
      }
      setLoading(false);
    };

    loadCurrencies();
  }, []);

  const handleConvert = async (formData: FormInputType) => {
    const { fromCurrency, toCurrency, amount } = formData;

    if (!fromCurrency || !toCurrency || !amount) return;

    setConverting(true);
    const rate = toCurrency.price / fromCurrency.price;
    const outputAmount = parseFloat(amount) * rate;

    await new Promise((resolve) => setTimeout(resolve, 500));

    setConversionResult({
      fromAmount: amount,
      toAmount: outputAmount.toFixed(6),
      fromSymbol: fromCurrency.symbol,
      toSymbol: toCurrency.symbol,
      rate,
    });

    setConverting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2
          className="animate-spin text-blue-500 dark:text-blue-400"
          size={32}
          role="status"
        />
      </div>
    );
  }

  return (
    <SwapForm
      currencies={currencies}
      handleConvert={handleConvert}
      isConverting={isConverting}
      conversionResult={conversionResult}
    />
  );
}
