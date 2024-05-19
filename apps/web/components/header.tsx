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
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-start">
            <p className="text-lg font-semibold">Hi, Harry! 😊</p>
          </div>
          <div className="flex items-center space-x-4"></div>
        </div>
      </div>
    </div>
  );
}
