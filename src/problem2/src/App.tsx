import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { SwapCurrency } from "./components/SwapCurrency";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <ThemeToggle />
        <SwapCurrency />
      </div>
    </ThemeProvider>
  );
}

export default App;
