import { useState, useRef, useEffect, forwardRef, ForwardedRef } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Token } from "../../types/token";

interface TokenSelectProps {
  value: Token | null;
  onChange: (token: Token) => void;
  tokens: Token[];
  label: string;
}

function TokenSelect(
  { value, onChange, tokens, label }: TokenSelectProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
      </label>

      <button
        type="button"
        id={label}
        onClick={() => setIsOpen(!isOpen)}
        ref={ref}
        className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white"
      >
        {value ? (
          <span className="flex items-center gap-2">
            <img
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${value.symbol}.svg`}
              alt={value.symbol}
              className="w-6 h-6"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span>{value.symbol}</span>
          </span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">Select token</span>
        )}
        <ChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tokens..."
                className="w-full bg-white dark:bg-gray-700 pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm dark:text-white dark:placeholder-gray-400"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-60 overflow-auto">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <button
                  key={token.symbol}
                  type="button"
                  onClick={() => {
                    onChange(token);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white"
                >
                  <img
                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.symbol}.svg`}
                    alt={token.symbol}
                    className="w-6 h-6"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{token.symbol}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ${token.price.toFixed(2)}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                No tokens found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default forwardRef(TokenSelect);
