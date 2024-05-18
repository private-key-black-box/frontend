import { GeistMono } from "geist/font/mono";

export interface USDBalanceProps {
  balance?: string;
}

export function USDBalance({ balance }: USDBalanceProps) {
  const MinaToUSD = 0.0080;
  const updatedBalance = balance ? (parseFloat(balance) * MinaToUSD).toFixed(2) : "—";

  return <span className={GeistMono.className}>{updatedBalance}$</span>;
}