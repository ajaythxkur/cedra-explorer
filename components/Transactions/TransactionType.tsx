import { TransactionResponseType } from "@cedra-labs/ts-sdk";

type TransactionTypeProps = {
    type: string;
}

export function TableTransactionType({ type }: TransactionTypeProps) {
    return (
        `${getTypeIcon(type)}`
    )
}

function getTypeIcon(type: string) {
  switch (type) {
    case TransactionResponseType.BlockMetadata:
      return "type ico";
    case TransactionResponseType.Genesis:
      return "ico";
    case TransactionResponseType.User:
      return "ico";
    case TransactionResponseType.Pending:
      return "ico";
    case TransactionResponseType.StateCheckpoint:
      return "ico";
    case TransactionResponseType.Validator:
      return "ico";
    case TransactionResponseType.BlockEpilogue:
      return "ico";
    default:
      return"ico";
  }
}