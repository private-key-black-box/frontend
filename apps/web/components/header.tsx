"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
// @ts-ignore
import truncateMiddle from "truncate-middle";

export function Header() {
  return (
    <header className="flex justify-center pt-4">
      <div className="flex w-11/12 items-center justify-start space-x-4 py-4">
        <img className="max-h-16" src="logo.png" alt="Logo" />
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-start">
            <p className="text-lg font-semibold">Hi, Harry! 😊</p>
          </div>
        </div>
      </div>
    </header>
  );
}
