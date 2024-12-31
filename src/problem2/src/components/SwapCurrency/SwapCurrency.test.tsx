import { act, render, screen, waitFor } from "@testing-library/react";
import { SwapCurrency } from "./SwapCurrency";
import { fetchTokenPrices } from "../../api/tokens";

jest.mock("../../api/tokens", () => ({
  fetchTokenPrices: jest.fn(),
}));

describe("SwapCurrency", () => {
  it("displays a loader while fetching currencies", async () => {
    (fetchTokenPrices as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ ETH: 3000, BTC: 50000 }), 1000)
        )
    );

    await act(async () => {
      render(<SwapCurrency />);
    });
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
  });

  it("renders the form after fetching currencies", async () => {
    (fetchTokenPrices as jest.Mock).mockResolvedValueOnce({
      ETH: 3000,
      BTC: 50000,
    });

    await act(async () => {
      render(<SwapCurrency />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Swap/i)).toBeInTheDocument();
    });
  });
});
