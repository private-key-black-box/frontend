import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  ChevronsRight,
  Loader2Icon,
  PiggyBank,
  Wallet as WalletIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { GeistMono } from "geist/font/mono";
import { Balance } from "../ui/balance";
import { USDBalance } from "../ui/usd-balance";
// @ts-ignore
import truncateMiddle from "truncate-middle";
import { tokens } from "@/tokens";
import { TransactionHistory, Transaction} from "../ui/transaction-history";

export interface Balances {
  [tokenId: string]: string | undefined;
}

export interface WalletProps {
  address?: string;
  blockHeight?: string;
  balances?: Balances;
  loading: boolean;
  onConnectWallet: () => void;
  onFaucetDrip: () => void;
  forceIsWalletOpen: boolean;
}

const sampleTransactions: Transaction[] = [
  { id: '1', date: '18.05.2024', amount: '1000.0 MINA', currency: 'MINA', type: 'Received' },
  { id: '2', date: '17.05.2024', amount: '1000.0 MINA', currency: 'MINA', type: 'Sent' },
  // { id: '3', date: '15.05.2024', amount: '1000.0 USDC', currency: 'USDC', type: 'Received' },
  // { id: '4', date: '13.05.2024', amount: '1000.0 MINA', currency: 'MINA', type: 'Received' },
  // { id: '5', date: '13.05.2024', amount: '1000.0 MINA', currency: 'MINA', type: 'Staking Reward' },
  // { id: '6', date: '10.05.2024', amount: '1000.0 USDC', currency: 'USDC', type: 'Sent' },
  // { id: '7', date: '09.05.2024', amount: '1.0 BTC', currency: 'BTC', type: 'Received' },
];

export function Wallet({
  address,
  blockHeight,
  balances,
  loading,
  onConnectWallet,
  forceIsWalletOpen,
  onFaucetDrip,
}: WalletProps) {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isWalletDoneTransitioning, setIsWalletDoneTransitioning] =
    useState(true);
  const [shouldDelayChevrons, setShouldDelayChevrons] = useState(false);

  useEffect(() => {
    setShouldDelayChevrons(false);
    setIsWalletDoneTransitioning(false);
    setTimeout(() => {
      setIsWalletDoneTransitioning(true);
    }, 310);

    setTimeout(() => {
      setIsWalletOpen(forceIsWalletOpen);
    }, 10);
  }, [forceIsWalletOpen]);

  return (
    <div className="group">
      <div
        className={cn(
          "fixed -right-[112px] top-7 z-0 transition-all duration-300 ease-in-out",
          {
            "group-hover:right-[246px]": isWalletOpen,
            "delay-1000": isWalletOpen && shouldDelayChevrons,
            "hover:right-0": !isWalletOpen && isWalletDoneTransitioning,
          },
        )}
        onClick={() => {
          setShouldDelayChevrons(false);
          setIsWalletDoneTransitioning(false);
          setTimeout(() => {
            setIsWalletDoneTransitioning(true);
          }, 300);

          !address && !isWalletOpen && onConnectWallet();
          address && setIsWalletOpen(!isWalletOpen);
        }}
      >
        <Button
          variant={"outline"}
          className={cn(
            "group relative flex w-[164px] justify-between rounded-r-none p-4 py-5 text-muted-foreground ",
          )}
        >
          {isWalletOpen ? (
            <ChevronsRight className="h-5 w-5" />
          ) : (
            <WalletIcon className="h-5 w-5" />
          )}

          <p
            className={cn([
              "opacity-0",
              "transition-all duration-300 ease-in-out",
              {
                "group-hover:ml-3 group-hover:opacity-100": !isWalletOpen,
              },
            ])}
          >
            {address ? "Open wallet" : "Connect wallet"}
          </p>
        </Button>
      </div>

      <div
        onMouseLeave={() => setShouldDelayChevrons(false)}
        onMouseEnter={() => setShouldDelayChevrons(true)}
        className={cn([
          "fixed -right-[360px] top-0 z-50 flex h-full w-[360px] flex-col  rounded-2xl  border-l-2 transition-all duration-300 ease-in-out",
          {
            "right-[0px] border-l-zinc-900 bg-zinc-950": isWalletOpen,
          },
        ])}
      >
        <div
          className={cn(
            "absolute right-0 flex h-full w-[360px] flex-col items-center justify-center border-l-2 border-l-zinc-900 bg-zinc-950 opacity-90",
            {
              hidden: !loading,
            },
          )}
        >
          <Loader2Icon className="h-12 w-12 animate-spin text-muted-foreground" />
        </div>
        <div
          className={cn("flex h-full flex-col transition-all duration-100", {
            "blur-md": loading,
          })}
        >
          <div className="rounded-xl border-b border-b-zinc-800 p-6">
            <div className="w-full rounded-2xl ">
              <p className="text-xs text-muted-foreground">Connected wallet</p>
              <p className="pt-1 text-sm">
                {address ? truncateMiddle(address, 15, 15, "...") : "—"}
              </p>
            </div>
            <div className="flex flex-col pt-4">
              <p className="text-xs text-muted-foreground">Current balance</p>
              <p className={cn("pt-1 text-2xl")}>
                <Balance balance={balances?.["0"] ?? "0"} tokenId="0" />
              </p>
              <p
                className={cn(
                  "max-w-32 text-sm text-muted-foreground",
                  GeistMono.className,
                )}
              >
                <USDBalance balance={undefined} />
              </p>
            </div>
          </div>

          <div className="flex flex-grow flex-col justify-between">
            <div className="p-6">
              <p className="text-md mb-5  text-muted-foreground">Tokens</p>

              <div className="grid gap-2">
                {Object.entries(balances ?? {}).map(([tokenId, balance]) => {
                  const token = tokens[tokenId];
                  if (!token || (BigInt(tokenId) > 3n && balance == "0"))
                    return null;
                  return (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img className="mr-3 h-8 w-8" src={token.logo} />
                        <div>
                          <p className="text-sm">{token.ticker}</p>
                          <p className="text-xs text-muted-foreground">
                            {token.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn("text-md pt-0.5")}>
                          <Balance balance={balance} />
                        </p>
                        <p
                          className={cn(
                            "text-sm text-muted-foreground",
                            GeistMono.className,
                          )}
                        >
                          <USDBalance balance={undefined} />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-6">
              <TransactionHistory transactions={sampleTransactions} />
            </div>
            <div className="flex w-full flex-col items-center justify-between p-6">
              <Button
                className="mb-4  w-full "
                variant={"outline"}
                onClick={onFaucetDrip}
              >
                <PiggyBank className="mr-2 h-4 w-4" />
                Get test tokens
              </Button>
              <div className="flex w-full justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Network</p>
                  <p className="text-sm">Localnet</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current block</p>
                  <p className="text-sm">
                    {blockHeight ? `#${blockHeight}` : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}