"use client"

import { TransactionResponse, TransactionResponseType } from "@cedra-labs/ts-sdk";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TableTransactionType } from "./TransactionType";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { shortAddress } from "@/lib/utils";
import { getTransactionCounterparty } from "./utils";
import { P14 } from "../typography";
dayjs.extend(relativeTime);

type TransactionCellProps = {
    transaction: TransactionResponse;
};

function SequenceNumberCell({ transaction }: TransactionCellProps) {
    return (
        <p>{"sequence_number" in transaction && transaction.sequence_number}</p>
    )
}

function TransactionVersionStatusCell({ transaction }: TransactionCellProps) {
    return (
        <TableCell>
            <Link href={`/txn/${transaction.hash}`}>
                {"version" in transaction && transaction.version}
            </Link>
            {
                "success" in transaction && (
                    " success icon"
                )
            }
        </TableCell>
    )
}

function TransactionTypeCell({ transaction }: TransactionCellProps) {
    return (
        <TableCell>
            <TableTransactionType type={transaction.type} />
        </TableCell>
    )
}

function TransactionTimestampCell({ transaction }: TransactionCellProps) {
    const timestamp = "timestamp" in transaction ? (
        `${dayjs(parseInt(transaction.timestamp) / 1000).fromNow()}`
    ) : (
        "-"
    );

    return (
        <TableCell>
            {timestamp}
        </TableCell>
    )
}

function TransactionSenderCell({ transaction }: TransactionCellProps) {
    let sender;
    if (transaction.type === TransactionResponseType.User) {
        sender = transaction.sender
    } else if (transaction.type === TransactionResponseType.BlockMetadata) {
        sender = transaction.proposer
    }

    return (
        <TableCell>
            {sender && shortAddress(sender)}
        </TableCell>
    )
}

function TransactionReceiverOrCounterPartyCell({ transaction }: TransactionCellProps) {
    const counterParty = getTransactionCounterparty(transaction);
    return (
        <TableCell>
            {
                counterParty && (
                    <>
                        {counterParty.role === "smartContract" ? (
                            `Smart Contract`
                        ) :
                            (
                                `Receiver`
                            )}
                        <span>
                            {shortAddress(transaction.hash)}
                        </span>
                    </>
                )
            }
        </TableCell>
    )
}

function TransactionFunctionCell({ transaction }: TransactionCellProps) {
    return (
        <TableCell>
            -
        </TableCell>
    )
}

function TransactionAmountGasCell({ transaction }: TransactionCellProps) {
    return (
        <TableCell>
            -
        </TableCell>
    )
}

const TransactionCells = Object.freeze({
    sequenceNum: SequenceNumberCell,
    versionStatus: TransactionVersionStatusCell,
    type: TransactionTypeCell,
    timestamp: TransactionTimestampCell,
    sender: TransactionSenderCell,
    receiverOrCounterParty: TransactionReceiverOrCounterPartyCell,
    function: TransactionFunctionCell,
    amountGas: TransactionAmountGasCell
})

export type TransactionColumn = keyof typeof TransactionCells;

const DEFAULT_COLUMNS: TransactionColumn[] = [
    "versionStatus",
    "type",
    "timestamp",
    "sender",
    "receiverOrCounterParty",
    "function",
    "amountGas"
]

type TransactionHeaderCellProps = {
  column: TransactionColumn;
};

export function TransactionHeaderCell({column}: TransactionHeaderCellProps) {
  switch (column) {
    case "sequenceNum":
      return "#";
    case "versionStatus":
      return "Version";
    case "type":
      return (
        "Type"
      );
    case "timestamp":
      return "Timestamp";
    case "sender":
      return "From";
    case "receiverOrCounterParty":
      return "To";
    case "function":
      return "Function";
    case "amountGas":
      return "Amount";
    default:
        throw new Error("Unexpected object: " + column);
  }
}

type TransactionRowProps = {
    transaction: TransactionResponse;
    columns: TransactionColumn[];
};

export function TransactionRow({ transaction, columns }: TransactionRowProps) {
    return (
        <TableRow>
            {columns.map((column) => {
                const TransactionCell = TransactionCells[column];
                return <TransactionCell key={column} transaction={transaction} />;
            })}
        </TableRow>
    );
}

type TransactionsTableProps = {
    transactions: TransactionResponse[],
    columns?: TransactionColumn[]
}

export function TransactionsTable({
    transactions,
    columns = DEFAULT_COLUMNS
}: TransactionsTableProps) {
    return (
        <Table className="overflow-hidden">
            <TableHeader className="border-b border-white/10">
                <TableRow>
                    {
                        columns.map((column, i) => (
                            <TableHead key={`${i}-${column}`}>
                                <P14>
                                    <TransactionHeaderCell column={column}/>
                                </P14>
                            </TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    transactions.map((transaction, i) => {
                        return (
                            <TransactionRow key={`${i}-${transaction.hash}`} transaction={transaction} columns={columns} />
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}
