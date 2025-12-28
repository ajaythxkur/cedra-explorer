"use client"
import { H2, P14 } from "@/components/typography";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCedraClient } from "@/lib/cedraClient"
import { shortAddress } from "@/lib/utils";
import { TransactionResponse } from "@cedra-labs/ts-sdk";
import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react"
import { IoSwapHorizontal } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import Stats from "./Stats";
import { Search } from "@/components/Search";
import Link from "next/link";

export function Home() {
    const cedraClient = getCedraClient();
    const [latestTransactions, setLatestTransactions] = useState<TransactionResponse[]>()
    const [ledgerInfo, setLedgerInfo] = useState();
    useEffect(() => {
        (async () => {
            try {
                const data = await cedraClient.getTransactions({
                    options: {
                        limit: 5
                    }
                });
                setLatestTransactions(data.reverse());
            } catch (error) {
                console.error(`Failed to get latest transactions: ${error}`)
            }
        })()
    }, [])
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
                    <div className="rounded-2xl p-2 bg-[#111111] overflow-hidden">
                        <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-xl border-b-3 border-[#005664]">
                            <H2>Latest Transactions</H2>
                        </div>
                        <Table className="overflow-hidden mt-4">
                            <TableBody>
                                {
                                    Array.from({ length: 10 }).map((_,i) => {
                                        return (
                                            <TableRow key={i} className="px-4 border-white/10 text-white/50">
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="rounded-full bg-white/20 p-2">
                                                            <IoSwapHorizontal size={20} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Link href={`/tx/${i}`}><P14>{shortAddress('iourwdsfw3423')}</P14></Link>
                                                            <P14>2 secs ago</P14>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-3">
                                                        <P14>From: <span className="border border-white/5 rounded-sm px-2">{shortAddress('iourwdsfw3423')}</span></P14>
                                                        <P14>To: <span className="border border-white/5 rounded-sm px-2">{shortAddress('iourwdsfw3423')}</span></P14>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="space-y-2">
                                                        <P14 className="font-medium">Amount</P14>
                                                        <P14 className="font-medium text-white">40 CED</P14>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>

                    {/* Blocks */}
                    <div className="rounded-2xl p-2 bg-[#111111] overflow-hidden">
                        <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-xl border-b-3 border-[#005664]">
                            <H2>Latest Blocks</H2>
                        </div>
                        <Table className="overflow-hidden mt-4">
                            <TableBody>
                                {
                                    Array.from({ length: 10 }).map((_,i) => {
                                        return (
                                            <TableRow key={i} className="px-4 border-white/10 text-white/50">
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="rounded-full bg-white/20 p-2">
                                                            <LuBox size={20} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <P14>#44380896</P14>
                                                            <P14>2 secs ago</P14>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="space-y-3">
                                                        <P14>Proposed by: Allnodes</P14>
                                                        <P14>10 txns</P14>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="space-y-2">
                                                        <P14 className="font-medium">Rewards</P14>
                                                        <P14 className="font-medium text-white">40 CED</P14>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}