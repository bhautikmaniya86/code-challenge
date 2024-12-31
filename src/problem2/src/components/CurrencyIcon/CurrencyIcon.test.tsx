import { render, screen } from "@testing-library/react";
import { CurrencyIcon } from "./CurrencyIcon";

describe("CurrencyIcon", () => {
  it("renders the currency icon with correct src and alt attributes", () => {
    render(<CurrencyIcon symbol="ETH" size={32} className="custom-class" />);

    const icon = screen.getByRole("img", { name: /ETH/i });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", expect.stringContaining("ETH.svg"));
    expect(icon).toHaveAttribute("alt", "ETH");
    expect(icon).toHaveStyle({ width: "32px", height: "32px" });
  });

  it("hides the icon if loading fails", () => {
    render(<CurrencyIcon symbol="INVALID" />);
    const icon = screen.getByRole("img", { name: /INVALID/i });

    // Simulate error
    icon.dispatchEvent(new Event("error"));

    expect(icon).not.toBeVisible();
  });
});
