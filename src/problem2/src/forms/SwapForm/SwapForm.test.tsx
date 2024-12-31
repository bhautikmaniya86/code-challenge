import React from "react";

import { render, screen, fireEvent, act } from "@testing-library/react";
import { SwapForm } from "./SwapForm";
import { Token } from "../../types/token";

const mockCurrencies: Token[] = [
  { symbol: "ETH", name: "Ethereum", price: 12 },
  { symbol: "BTC", name: "Bitcoin", price: 500 },
];

describe("SwapForm", () => {
  it('should display validation message when "Token to Send" is not selected', async () => {
    render(
      <SwapForm
        currencies={mockCurrencies}
        handleConvert={jest.fn()}
        isConverting={false}
        conversionResult={null}
      />
    );

    fireEvent.submit(screen.getByRole("form"));

    expect(
      await screen.findByText(
        "Please select the token you want to convert from."
      )
    ).toBeInTheDocument();
  });

  it('should display validation message when "Token to Receive" is not selected', async () => {
    render(
      <SwapForm
        currencies={mockCurrencies}
        handleConvert={jest.fn()}
        isConverting={false}
        conversionResult={null}
      />
    );

    fireEvent.submit(screen.getByRole("form"));

    expect(
      await screen.findByText("Please select the token you want to convert to.")
    ).toBeInTheDocument();
  });

  it('should display validation message when "Amount to Send" is empty', async () => {
    render(
      <SwapForm
        currencies={mockCurrencies}
        handleConvert={jest.fn()}
        isConverting={false}
        conversionResult={null}
      />
    );

    fireEvent.submit(screen.getByRole("form"));

    expect(
      await screen.findByText("Please enter the amount you want to send.")
    ).toBeInTheDocument();
  });

  it('should display validation message when "Amount to Send" is less than zero', async () => {
    render(
      <SwapForm
        currencies={mockCurrencies}
        handleConvert={jest.fn()}
        isConverting={false}
        conversionResult={null}
      />
    );

    fireEvent.change(screen.getByLabelText("Amount to send"), {
      target: { value: "-1" },
    });
    fireEvent.submit(screen.getByRole("form"));

    expect(
      await screen.findByText("Amount must be greater than zero.")
    ).toBeInTheDocument();
  });

  it("should call handleConvert when all fields are valid", async () => {
    const mockHandleConvert = jest.fn();

    render(
      <SwapForm
        currencies={mockCurrencies}
        handleConvert={mockHandleConvert}
        isConverting={false}
        conversionResult={null}
      />
    );

    // Select "Token to Send"
    fireEvent.click(screen.getByLabelText("Token to Send"));
    fireEvent.click(screen.getByText("ETH"));

    // Select "Token to Receive"
    fireEvent.click(screen.getByLabelText("Token to Receive"));
    fireEvent.click(screen.getByText("BTC"));

    // Enter "Amount to Send"
    fireEvent.change(screen.getByLabelText("Amount to send"), {
      target: { value: "100" },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("form"));
    });

    expect(mockHandleConvert).toHaveBeenCalledWith({
      fromCurrency: mockCurrencies[0], // ETH
      toCurrency: mockCurrencies[1], // BTC
      amount: "100",
    });
  });
});
