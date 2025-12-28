"use client"
import { H2, P14 } from "@/components/typography";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { shortAddress } from "@/lib/utils";
import { Block, TransactionResponse, TransactionResponseType } from "@cedra-labs/ts-sdk";
import { SearchIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react"
import { IoSwapHorizontal } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import Stats from "./Stats";
import { Search } from "@/components/Search";
import Link from "next/link";
import { cedraClient } from "@/lib/cedraClient";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function Home() {
    const [latestTransactions, setLatestTransactions] = useState<TransactionResponse[]>();
    const [latestBlocks, setLatestBlocks] = useState<Block[]>();

    const getLatestBlocks = useCallback(async () => {
        try {
            const ledgerData = await cedraClient.getLedgerInfo();
            const endBlock = parseInt(ledgerData.block_height);
            const startBlock = endBlock - 4;
            const data: Block[] = [];
            for (let i = startBlock; i <= endBlock; i++) {
                const block = await cedraClient.getBlockByHeight({ blockHeight: i });
                data.push(block)
            };
            setLatestBlocks(data.reverse());
        } catch (error) {
            console.log(`Error in getLatestBlocks: ${error}`)
        }
    }, [])

    const getLatestTransactions = useCallback(async () => {
        try {
            const data = await cedraClient.getTransactions({
                options: {
                    limit: 5
                }
            });
            setLatestTransactions(data);
        } catch (error) {
            console.log(`Error in getLatestTransactions: ${error}`)
        }
    }, [])
    useEffect(() => {
        getLatestBlocks()
        getLatestTransactions()
    }, [getLatestBlocks, getLatestTransactions])
    console.log(latestBlocks)
    return (
        <>
            {/* <div className="min-h-screen w-full relative bg-black pt-30"> */}
            <div className="min-h-screen w-full relative pt-10">
                {/* Search */}
                <Search />

                {/* Stats */}
                <Stats />

                <div className="py-10 grid grid-cols-2 gap-6 px-4 relative z-10 max-w-7xl mx-auto">
                    {/* Transactions */}
                    {
                        latestTransactions &&
                        (
                            <div className="rounded-2xl p-2 bg-[#111111] overflow-hidden">
                                <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-xl border-b-3 border-[#005664]">
                                    <H2>Latest Transactions</H2>
                                </div>
                                <Table className="overflow-hidden mt-4">
                                    <TableBody>
                                        {
                                            latestTransactions.map(txn => {
                                                return (
                                                    <TableRow key={txn.hash} className="px-4 border-white/10 text-white/50">
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <div className="rounded-full bg-white/20 p-2">
                                                                    <IoSwapHorizontal size={20} />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Link href={`/tx/${txn.hash}`}><P14>{shortAddress(txn.hash)}</P14></Link>
                                                                    <P14><TxnTime txn={txn} /></P14>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <TxnPath txn={txn}/>
                                                        </TableCell>    
                                                        <TableCell className="text-right">
                                                            <div className="space-y-2">
                                                                <P14 className="font-medium">Amount</P14>
                                                                <P14 className="font-medium text-white"><TxnAmount txn={txn}/></P14>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>

                            </div>
                        )
                    }


                    {/* Blocks */}
                    {
                        latestBlocks && (
                            <div className="rounded-2xl p-2 bg-[#111111] overflow-hidden">
                                <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-xl border-b-3 border-[#005664]">
                                    <H2>Latest Blocks</H2>
                                </div>
                                <Table className="overflow-hidden mt-4">
                                    <TableBody>
                                        {
                                            latestBlocks.map(block => {
                                                return (
                                                    <TableRow key={block.block_height} className="px-4 border-white/10 text-white/50">
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <div className="rounded-full bg-white/20 p-2">
                                                                    <LuBox size={20} />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <P14>#{block.block_height}</P14>
                                                                    <P14>{dayjs.unix(Math.floor(Number(block.block_timestamp) / 1_000_000)).fromNow()}</P14>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="space-y-3">
                                                                <P14>Total Txns</P14>
                                                                <P14>{parseInt(block.last_version) - parseInt(block.first_version) + 1}</P14>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <div className="space-y-2">
                                                                <P14 className="font-medium">Block Hash</P14>
                                                                <P14 className="font-medium text-white">{shortAddress(block.block_hash)}</P14>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        )
                    }

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