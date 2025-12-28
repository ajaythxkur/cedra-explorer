"use client"
import { H2, P14 } from "@/components/typography";
import { Table, TableHead } from "@/components/ui/table";
import { shortAddress } from "@/lib/utils";
import { TransactionResponse, TransactionResponseType } from "@cedra-labs/ts-sdk";
import Stats from "./Stats";
import { Search } from "@/components/Search";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TransactionLoading from "@/components/skeletons/homeSkeletons";
import { RxDoubleArrowRight } from "react-icons/rx";
import { useApp } from "@/context/AppProvider";
import { useQuery } from "@tanstack/react-query";
import { TransactionColumn, TransactionHeaderCell, TransactionRow, TransactionsTable } from "@/components/Transactions/TransactionsTable";
import { BlocksColumn, BlocksTable } from "@/components/Blocks/BlocksTable";
import { getRecentBlocks } from "@/components/Blocks/utils";
dayjs.extend(relativeTime);

const TRANSACTION_COLUMNS: TransactionColumn[] = [
    "versionStatus",
    "timestamp",
    "sender",
    "receiverOrCounterParty",
    "amountGas"
]

const BLOCKS_COLUMNS: BlocksColumn[] = [
    "block_height",
    "block_timestamp",
    "first_version",
    "last_version",
    "txn_count"
]

const RECENT_BLOCKS_COUNT = 5;
export function Home() {
    const router = useRouter()
    const { state, ledgerData } = useApp()

    const { data: latestTransactions } = useQuery({
        queryKey: ["latestTransactions", state.client.config.network],
        queryFn: () => state.client.getTransactions({
            options: {
                limit: 5
            }
        })
    })

    const {data: latestBlocks} = useQuery({
        queryKey: ["latestBlocks", ledgerData.block_height, state.client.config.network],
        queryFn: async () => {
            return getRecentBlocks(parseInt(ledgerData.block_height), RECENT_BLOCKS_COUNT, state.client);
        },
    });
    return (
        <>
            <div className="min-h-screen w-full relative pt-10">
                <Search />
                <Stats />

                <div className="py-10 grid grid-cols-2 gap-6 px-4 relative z-10 max-w-7xl mx-auto">
                    <div className="rounded-2xl p-2 bg-[#111111] overflow-hidden">
                        <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-xl border-b-3 border-[#005664]">
                            <H2>Latest Transactions</H2>
                        </div>
                        {/* <Table className="overflow-hidden mt-4">
                            {
                                TRANSACTION_COLUMNS.map((column, i) => (
                                    <TableHead key={`${i}-${column}`}><P14><TransactionHeaderCell column={column} /></P14></TableHead>
                                ))
                            }
                            {
                                !latestTransactions 
                                ?
                                <TransactionLoading />
                                :
                                latestTransactions.map((transaction, i) => (
                                    <TransactionRow transaction={transaction} columns={TRANSACTION_COLUMNS}/>
                                ))
                            }

                        </Table> */}
                        {
                            latestTransactions && <TransactionsTable transactions={latestTransactions} columns={TRANSACTION_COLUMNS}/>
                        }
                        <div className="w-full text-center py-4 pb-2">
                            <Link href="/transactions">
                                <Button className="mx-auto">View All Transactions <RxDoubleArrowRight size={16} /></Button>
                            </Link>
                        </div>
                    </div>

                    {/* Blocks */}
                    <div className="rounded-2xl p-2 bg-[#111111] overflow-hidden">
                        <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-xl border-b-3 border-[#005664]">
                            <H2>Latest Blocks</H2>
                        </div>
                        {
                            latestBlocks && <BlocksTable columns={BLOCKS_COLUMNS} blocks={latestBlocks} />
                        }
                        <div className="w-full text-center py-4 pb-2">
                            <Link href="/blocks"><Button className="mx-auto">View More <RxDoubleArrowRight size={16} /></Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function TxnTime({ txn }: { txn: TransactionResponse }) {
    if (txn.type == TransactionResponseType.User || txn.type == TransactionResponseType.BlockMetadata || txn.type == TransactionResponseType.BlockEpilogue || txn.type == TransactionResponseType.StateCheckpoint) {
        return `${dayjs.unix(Math.floor(Number(txn.timestamp) / 1_000_000)).fromNow()}`
    } else {
        return ""
    }
}

function TxnPath({ txn }: { txn: TransactionResponse }) {
    if (txn.type == TransactionResponseType.User) {
        return (
            <div className="space-y-3">
                <P14>Sender: <span className="border border-white/5 rounded-sm px-2">{shortAddress(txn.sender)}</span></P14>
            </div>
        )
    } else {
        return ""
    }
}

function TxnAmount({ txn }: { txn: TransactionResponse }) {
    if (txn.type == TransactionResponseType.User) {
        const grossGasUnits = BigInt(txn.gas_used);
        const gasUnitPrice = Number(txn.gas_unit_price);
        const netGasWithoutRefund = BigInt(gasUnitPrice) * grossGasUnits;

        return (
            `${(Number(netGasWithoutRefund) / Math.pow(10, 8))}`
        )
    } else {
        return "-"
    }
}