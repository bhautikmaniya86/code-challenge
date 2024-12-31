interface PriceData {
  currency: string;
  date: string;
  price: number;
}

export async function fetchTokenPrices(): Promise<Record<string, number>> {
  try {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    const data: PriceData[] = await response.json();

    // Convert array of price data to Record<symbol, price>
    return data.reduce((acc, { currency, price }) => {
      if (price) {
        acc[currency] = price;
      }
      return acc;
    }, {} as Record<string, number>);
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return {};
  }
}
