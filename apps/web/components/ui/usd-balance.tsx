import { GeistMono } from "geist/font/mono";

export interface USDBalanceProps {
  balance?: string;
}

export function USDBalance({ balance }: USDBalanceProps) {
  return <span className={GeistMono.className}>{balance ?? "—"}$</span>;
}
const Mina = 0.80

