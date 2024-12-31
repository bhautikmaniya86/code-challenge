import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { SwapCurrency } from "./components/SwapCurrency";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center p-4 bg-background bg-cover bg-center">
        <ThemeToggle />
        <SwapCurrency />
      </div>
    </ThemeProvider>
  );
}

export default App;
