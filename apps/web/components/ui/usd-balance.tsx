import { GeistMono } from "geist/font/mono";
import { tokens } from "@/tokens";

export interface USDBalanceProps {
  balance?: string;
  tokenId: string;
}

export function USDBalance({ balance, tokenId }: USDBalanceProps) {
  const token = tokens[tokenId];
  const usdPrice = token?.usdPrice ?? 0;
  const updatedBalance = balance ? (parseFloat(balance) * usdPrice).toFixed(2) : "—";

  return <span className={GeistMono.className}>{updatedBalance}$</span>;
}
