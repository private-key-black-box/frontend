"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronsRight, PiggyBank, Wallet as WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { GeistMono } from "geist/font/mono";
import { Balance } from "./ui/balance";
import { USDBalance } from "./ui/usd-balance";
// @ts-ignore
import truncateMiddle from "truncate-middle";


export function Header() {
  return (
    <div className="flex justify-center pt-4">
      <div className="flex basis-11/12 items-center justify-start space-x-4 py-4">
        <img className="max-h-16" src="logo.png" alt="Logo" />
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-start">
            <p className="text-lg font-semibold">Hi, Harry! 😊</p>
            <p className="text-sm text-gray-500">Your Balance...</p>
            <p className="text-2xl font-bold">1 000.0 MINA</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <WalletIcon className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <p className="text-sm">Light Wallet Connected</p>
                <p className="text-sm text-gray-500">
                  {truncateMiddle('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 10, 10, "...")}
                </p>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <ChevronsRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <PiggyBank className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}