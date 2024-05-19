import {
  runtimeMethod,
  RuntimeModule,
  runtimeModule,
} from "@proto-kit/module";
import { inject } from "tsyringe";

import {
  CircuitString,
  Encryption,
  Experimental,
  Field,
  PublicKey,
  PrivateKey,
  Provable,
  Struct,
} from "o1js";
import { MAX_TOKEN_ID, TokenRegistry } from "./token-registry";
import { Balances } from "./balances";
import { UInt64 } from "@proto-kit/library";
import { StateMap, assert } from "@proto-kit/protocol";

export const errors = {
  senderNotFrom: () => "Sender does not match 'from'",
  fromBalanceInsufficient: () => "From balance is insufficient",
};

export class TokenId extends Field {}
export class BalancesKey extends Struct({
  tokenId: TokenId,
  address: PublicKey,
}) {
  public static from(tokenId: TokenId, address: PublicKey) {
    return new BalancesKey({ tokenId, address });
  }
}

export class Balance extends UInt64 {}

const generate = (seed: CircuitString) => {
  // Transform seed to private key and pad it to 255 fields
  let seedFields = seed.toFields();
  const padding = Array(255 - seedFields.length).fill(Field(0));
  const paddedFields = seedFields.concat(padding).slice(0, 255);

  const privateKey = PrivateKey.fromFields(paddedFields);

  const message = privateKey.toFields();
  const publicKey = privateKey.toPublicKey();
  const encryptedPrivateKey = Encryption.encrypt(message, publicKey); // [Field] // 255
  // let cipherText = encryptedPrivateKey.cipherText;
  // console.log(`cipherText: ${cipherText.length}`);

  return publicKey; // return public key
};

const MyProgram = Experimental.ZkProgram({
  publicOutput: PublicKey,
  methods: {
    generate: {
      privateInputs: [CircuitString],
      method: generate,
    },
  },
});

export class NoSignerProof extends Experimental.ZkProgram.Proof(MyProgram) { }


// let { verificationKey } = await MyProgram.compile();

const publicInput = undefined;
const proof = new NoSignerProof({
  proof: "dummy",
  publicInput,
  publicOutput: generate(CircuitString.fromString("test")),
  maxProofsVerified: 2,
});

@runtimeModule()
export class NoSigning extends RuntimeModule<Record<string, never>> {
  // @state() public circulatingSupply = State.from<Balance>(Balance);

  public constructor(
    @inject("Balances") public balances: Balances,
    @inject("TokenRegistry") public tokenRegistry: TokenRegistry
  ) {
    super();
  }

  @runtimeMethod()
  public generate(
    seed: CircuitString,
  ): PublicKey {
    return generate(seed);
  }

  @runtimeMethod()
  public transferWithProof(
    tokenId: TokenId,
    from: PublicKey,
    to: PublicKey,
    amount: Balance,
    proof: NoSignerProof,
  ) {
    proof.verify();
    // design proof that is gives the from address as output
    // assert that address is the same as from
    // import assert from o1js
    this.balances.transfer(tokenId, from, to, amount);
  }
  
  @runtimeMethod()
  public transferWithoutProof(
    tokenId: TokenId,
    from: PublicKey,
    to: PublicKey,
    amount: Balance,
  ) {
    this.balances.transfer(tokenId, from, to, amount);
  }
  
}
