"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { tokens } from "@/tokens";

export interface Transaction {
  id: string;
  date: string;
  amount: string;
  currency: string;
  type: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const sampleTransactions: Transaction[] = [
  { id: '1', date: '18.05.2024', amount: '1000.0 MINA', currency: 'MINA', type: 'Received' },
  { id: '2', date: '17.05.2024', amount: '1000.0 MINA', currency: 'MINA', type: 'Sent' },
  { id: '3', date: '15.05.2024', amount: '1000.0 USDC', currency: 'USDC', type: 'Received' },
  { id: '4', date: '13.05.2024', amount: '1000.0 MINA', currency: 'MINA', type: 'Received' },
  { id: '5', date: '13.05.2024', amount: '1000.0 MINA', currency: 'MINA', type: 'Staking Reward' },
  { id: '6', date: '10.05.2024', amount: '1000.0 USDC', currency: 'USDC', type: 'Sent' },
  { id: '7', date: '09.05.2024', amount: '1.0 BTC', currency: 'BTC', type: 'Received' },
];

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions = sampleTransactions }) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-5">Transaction History</h2>
      <div className="grid gap-4">
        {transactions.map((transaction) => {
          const token = Object.values(tokens).find(
            (t) => t?.ticker.toUpperCase() === transaction.currency.toUpperCase()
          );
          return (
            <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center">
                {token ? (
                  <img className="mr-3 h-10 w-10 rounded-full" src={token.logo} alt={`${transaction.currency} icon`} />
                ) : (
                  <div className="mr-3 h-10 w-10 rounded-full bg-gray-200" />
                )}
                <div>
                  <p className="text-sm font-medium">{transaction.currency}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn("text-md font-semibold", transaction.type === 'Received' ? 'text-green-500' : 'text-red-500')}>{transaction.amount}</p>
                <p className="text-xs text-gray-500">{transaction.type}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};