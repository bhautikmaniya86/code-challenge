# ✅ Problem 3 : Messy React Solution

- Refactored WalletPage for performance and readability
- Improved type safety by explicitly typing blockchain.
- Optimized getPriority with a constant-time lookup using a map.
- Combined filtering, sorting, and mapping for better performance.
- Memoized rows to prevent unnecessary re-renders.
- Corrected useMemo dependencies.
- Replaced index keys with unique keys for rendering reliability.



### Refactored Code 
```typescript
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';
  }
  
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string; // Adds a formatted string representation of the amount
  }
  
  interface Props extends BoxProps {}
  
  // Helper function to assign priority to each blockchain
  const getPriority = (blockchain: WalletBalance['blockchain']): number => {
    const priorities: Record<WalletBalance['blockchain'], number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorities[blockchain] || -99; // Default priority for unsupported blockchains
  };
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
  
    // Fetch wallet balances and prices from hooks
    const balances = useWalletBalances(); // Returns array of balances
    const prices = usePrices(); // Returns object with prices by currency
  
    // Memoized computation of rows to optimize rendering
    const rows = useMemo(() => {
      return (
        balances
          // Filter balances with valid priorities and non-zero amounts
          .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
          // Sort balances by descending priority
          .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
          // Map balances to WalletRow components
          .map((balance : FormattedWalletBalance) => {
            const usdValue = prices[balance.currency] * balance.amount; // Calculate USD value
            return (
              <WalletRow
                className={classes.row}
                key={`${balance.blockchain}-${balance.currency}`} // Unique key for each row
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.amount.toFixed()} // Format amount to string
              />
            );
          })
      );
    }, [balances, prices]); // Only recompute rows when balances or prices change
  
    // Render the WalletPage component
    return (
      <div {...rest}>
        {rows /* Render computed rows */}
      </div>
    );
  };
  ```