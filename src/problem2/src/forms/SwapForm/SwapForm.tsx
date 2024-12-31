import { ArrowDownUp, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Token } from "../../types/token";
import { CurrencyIcon, TokenSelect } from "../../components";

export type FormInputType = {
  fromCurrency: Token | null;
  toCurrency: Token | null;
  amount: string;
};

type SwapFormProps = {
  currencies: Token[];
  handleConvert: (formData: FormInputType) => void;
  isConverting: boolean;
  conversionResult: {
    fromAmount: string;
    toAmount: string;
    fromSymbol: string;
    toSymbol: string;
    rate: number;
  } | null;
};

export function SwapForm({
  currencies,
  handleConvert,
  isConverting,
  conversionResult,
}: SwapFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormInputType>({
    reValidateMode: "onChange",
  });

  const onSubmit = async (formValues: FormInputType) => {
    handleConvert({
      amount: formValues.amount,
      fromCurrency: formValues.fromCurrency,
      toCurrency: formValues.toCurrency,
    });
  };

  const exchangeCurrencyHandler = () => {
    const formValues = getValues();
    const temp = formValues.fromCurrency;

    setValue("fromCurrency", formValues.toCurrency);
    setValue("toCurrency", temp);
  };

  return (
    <form
      role="form"
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto shadow-lg p-6 h-full w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 border-s"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Swap</h2>

      <div className="space-y-6">
        <div>
          <Controller
            name="fromCurrency"
            control={control}
            rules={{
              required: "Please select the token you want to convert from.",
            }}
            render={({ field: { value, ref }, fieldState: { error } }) => (
              <div>
                <TokenSelect
                  label="Token to Send"
                  value={value}
                  key={value?.symbol}
                  ref={ref}
                  onChange={(value) => {
                    setValue("fromCurrency", value);
                    trigger("fromCurrency");
                  }}
                  tokens={currencies}
                />
                {!!error?.message && (
                  <p className="mt-1 text-xs text-red-600">{error.message}</p>
                )}
              </div>
            )}
          />
          <div className="mt-3">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Amount to send
            </label>
            <input
              id="amount"
              type="number"
              {...register("amount", {
                required: "Please enter the amount you want to send.",
                min: {
                  value: 0,
                  message: "Amount must be greater than zero.",
                },
              })}
              placeholder="0.00"
              className="w-full border bg-transparent border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white dark:placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              step="any"
            />
            {!!errors?.amount?.message && (
              <p className="mt-1 text-xs text-red-600">
                {errors.amount.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={exchangeCurrencyHandler}
          className="mx-auto block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowDownUp className="text-gray-600 dark:text-gray-400" size={20} />
        </button>

        <Controller
          name="toCurrency"
          control={control}
          rules={{
            required: "Please select the token you want to convert to.",
          }}
          render={({ field: { value, ref }, fieldState: { error } }) => (
            <div>
              <TokenSelect
                label="Token to Receive"
                key={value?.symbol}
                value={value}
                ref={ref}
                onChange={(value) => {
                  setValue("toCurrency", value);
                  trigger("toCurrency");
                }}
                tokens={currencies}
              />
              {!!error?.message && (
                <p className="mt-1 text-xs text-red-600">{error.message}</p>
              )}
            </div>
          )}
        />

        {conversionResult && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-lg p-4">
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-3">
              <div className="flex gap-3">
                <p className="flex items-center gap-2">
                  <CurrencyIcon
                    symbol={conversionResult.fromSymbol}
                    size={20}
                  />
                  {conversionResult.fromAmount} {conversionResult.fromSymbol} =
                </p>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <CurrencyIcon symbol={conversionResult.toSymbol} size={24} />
                  {conversionResult.toAmount} {conversionResult.toSymbol}
                </p>
              </div>
              <div className="flex gap-1">
                <p className="text-xs flex items-center gap-1">
                  <CurrencyIcon
                    symbol={conversionResult.fromSymbol}
                    size={16}
                  />
                  <span>1</span>
                  <span>{conversionResult.fromSymbol} =</span>{" "}
                </p>
                <p>
                  <CurrencyIcon symbol={conversionResult.toSymbol} size={16} />
                  <span>{conversionResult.rate.toFixed(6)}</span>
                  <span>{conversionResult.toSymbol}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isConverting}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:ring-offset-gray-800"
        >
          {isConverting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Converting...
            </span>
          ) : (
            "Convert"
          )}
        </button>
      </div>
    </form>
  );
}
