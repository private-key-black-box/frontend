import { create } from "zustand";
import { Client, useClientStore } from "./client";
import { immer } from "zustand/middleware/immer";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { Balance, BalancesKey, TokenId } from "@proto-kit/library";
import { PublicKey } from "o1js";
import { NoSignerProof } from "chain";
import { mockProof } from "chain";
import { useCallback, useEffect, useMemo } from "react";
import { useChainStore } from "./chain";
import { useWalletStore } from "./wallet";

export interface NoSigningState {
  loading: boolean;
  transfer: (
    client: Client,
    sender: string,
    tokenId: string,
    address: string,
    amount: string,
  ) => Promise<PendingTransaction>;
}

export function isPendingTransaction(
  transaction: PendingTransaction | UnsignedTransaction | undefined,
): asserts transaction is PendingTransaction {
  if (!(transaction instanceof PendingTransaction))
    throw new Error("Transaction is not a PendingTransaction");
}

export const tokenId = TokenId.from(0);

export const useNoSigningStore = create<
  NoSigningState,
  [["zustand/immer", never]]
>(
  immer((set) => ({
    loading: Boolean(false),
    async transfer(
      client: Client,
      address: string,
      tokenId: string,
      recipient: string,
      amount: string,
    ) {
      const noSigning = client.runtime.resolve("NoSigning");
      const sender = PublicKey.fromBase58(address);

      console.log("tx created");
      const mock = NoSignerProof.fromJSON(mockProof);
      mock.proof.publicOutput = [sender];
      console.log(mock);
      console.log("mock created");

      const tx = await client.transaction(sender, () => {
        noSigning.transferWithProof(
          TokenId.from(tokenId),
          sender,
          PublicKey.fromBase58(recipient),
          Balance.from(amount),
          mock, // TODO: ADD PROOF HERE
        );
      });
      console.log("tx finished");

      await tx.sign();

      await tx.send();

      isPendingTransaction(tx.transaction);
      return tx.transaction;
    },
  })),
);

export const useTransfer = () => {
  const client = useClientStore();
  const noSigning = useNoSigningStore();
  const wallet = useWalletStore();

  return useCallback(
    async (tokenId: string, recipient: string, amount: string) => {
      if (!client.client || !wallet.wallet) return;

      const pendingTransaction = await noSigning.transfer(
        client.client,
        wallet.wallet,
        tokenId,
        recipient,
        amount,
      );

      wallet.addPendingTransaction(pendingTransaction);
    },
    [client.client, wallet.wallet],
  );
};
