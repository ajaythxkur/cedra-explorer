import { TransactionPayloadEntryFunction, TransactionPayloadResponse, TransactionResponse, TransactionResponseType } from "@cedra-labs/ts-sdk";

export type TransactionCounterparty = {
  address: string;
  role: "receiver" | "smartContract";
};

export function getTransactionCounterparty(
  transaction: TransactionResponse,
): TransactionCounterparty | undefined {
  if (transaction.type !== TransactionResponseType.User) {
    return undefined;
  }

  if (!("payload" in transaction)) {
    return undefined;
  }

  let payload: TransactionPayloadResponse;
  if (transaction.payload.type === "entry_function_payload") {
    payload =
      transaction.payload;
  } else if (
    transaction.payload.type === "multisig_payload" &&
    "transaction_payload" in transaction.payload &&
    transaction.payload.transaction_payload &&
    "type" in transaction.payload.transaction_payload &&
    transaction.payload.transaction_payload.type === "entry_function_payload"
  ) {
    payload = transaction.payload
      .transaction_payload;
  } else {
    return undefined;
  }
}
