"use client"

import { Block } from "@cedra-labs/ts-sdk"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { shortAddress } from "@/lib/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { P14 } from "../typography";
import Link from "next/link";
import { useState } from "react";
dayjs.extend(relativeTime);

type BlockCellProps = {
    block: Block
}
function BlockHash({ block }: BlockCellProps) {
    const [isFullAddress, setIsFullAddress] = useState(false)
    return (
        <TableCell onClick={() => setIsFullAddress(!isFullAddress)}>
            {isFullAddress ? block.block_hash : shortAddress(block.block_hash)}
        </TableCell>
    )
}

function BlockHeight({ block }: BlockCellProps) {
    return (
        <TableCell>
            <Link href={"/block/" + block.block_height}>{block.block_height}</Link>
        </TableCell>
    )
}

function BlockTimestamp({ block }: BlockCellProps) {
    return (
        <TableCell>
            {dayjs(parseInt(block.block_timestamp) / 1000).fromNow()}
        </TableCell>
    )
}

function FirstVersion({ block }: BlockCellProps) {
    return (
        <TableCell>
            <Link href={"/txn/" + block.first_version}>{block.first_version}</Link>
        </TableCell>
    )
}

function LastVersion({ block }: BlockCellProps) {
    return (
        <TableCell>
            <Link href={"/txn/" + block.last_version}>{block.last_version}</Link>
        </TableCell>
    )
}

function TxnCount({ block }: BlockCellProps) {
    return (
        <TableCell>
            {parseInt(block.last_version) - parseInt(block.first_version) + 1}
        </TableCell>
    )
}

const BlockCells = Object.freeze({
    block_hash: BlockHash,
    block_height: BlockHeight,
    block_timestamp: BlockTimestamp,
    first_version: FirstVersion,
    last_version: LastVersion,
    txn_count: TxnCount
})
export type BlocksColumn = keyof typeof BlockCells;

const DEFAULT_COLUMNS: BlocksColumn[] = [
    "block_height",
    "block_timestamp",
    "block_hash",
    "txn_count",
    "first_version",
    "last_version",
]

type BlockRowProps = {
    block: Block;
    columns: BlocksColumn[];
}

function BlockRow({ block, columns }: BlockRowProps) {
    return (
        <TableRow>
            {columns.map((column) => {
                const BlockCell = BlockCells[column];
                return <BlockCell key={column} block={block} />;
            })}
        </TableRow>
    )
}

type BlockHeaderCellProps = {
    column: BlocksColumn;
}

function BlockHeaderCell({ column }: BlockHeaderCellProps) {
    switch (column) {
        case "block_hash":
            return "#";
        case "block_height":
            return "Block";
        case "block_timestamp":
            return "Timestamp";
        case "first_version":
            return "First Version";
        case "last_version":
            return "Last Version";
        case "txn_count":
            return "Txn Count";
        default:
            throw new Error("Unexpected object: " + column);
    }
}

type BlocksTableProps = {
    blocks: Block[];
    columns?: BlocksColumn[];
}

export function BlocksTable({ blocks, columns = DEFAULT_COLUMNS }: BlocksTableProps) {
    return (
        <Table className="overflow-hidden">
            <TableHeader className="border-b border-white/10">
                <TableRow>
                    {
                        columns.map((column, i) => (
                            <TableHead key={`${i}-${column}`}>
                                {/* <P14 className={`${i === columns.length -1 ? 'text-end' : ''}`}> */}
                                <P14>
                                    <BlockHeaderCell column={column} />
                                </P14>
                            </TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    blocks.map((block, i) => {
                        return (
                            <BlockRow key={`${i}-${block.block_height}`} block={block} columns={columns} />
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}