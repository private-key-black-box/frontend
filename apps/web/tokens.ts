"use client";

import { TokenId } from "@proto-kit/library";
import { LPTokenId, TokenPair } from "chain";

const lpToken01 = LPTokenId.fromTokenPair(
  TokenPair.from(TokenId.from(0), TokenId.from(1)),
).toString();

const lpToken02 = LPTokenId.fromTokenPair(
  TokenPair.from(TokenId.from(0), TokenId.from(2)),
).toString();

const lpToken12 = LPTokenId.fromTokenPair(
  TokenPair.from(TokenId.from(1), TokenId.from(2)),
).toString();

export const tokens: Record<
  string,
  | {
      ticker: string;
      name: string;
      logo: string;
      usdPrice: number;
    }
  | undefined
> = {
  "0": {
    ticker: "MINA",
    name: "Mina Protocol",
    logo: "/svg/tokens/mina.svg",
    usdPrice: 0.80,
  },
  "1": {
    ticker: "DAI",
    name: "DAI Stablecoin",
    logo: "/svg/tokens/dai.svg",
    usdPrice: 1.00,
  },
  "2": {
    ticker: "BTC",
    name: "Bitcoin",
    logo: "/svg/tokens/btc.svg",
    usdPrice: 66700.00,
  },
  [lpToken01]: {
    ticker: "MINA/DAI",
    name: "LP Token",
    logo: "/svg/tokens/lp.svg",
    usdPrice: 0,
  },
  [lpToken02]: {
    ticker: "MINA/BTC",
    name: "LP Token",
    logo: "/svg/tokens/lp.svg",
    usdPrice: 0,
  },
  [lpToken12]: {
    ticker: "DAI/BTC",
    name: "LP Token",
    logo: "/svg/tokens/lp.svg",
    usdPrice: 0,
  },
};

export const pools: [string, string][] = [
  ["0", "1"],
  ["1", "2"],
];
