'use client'
import { Search } from "@/components/Search"
import { H2, P14 } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { shortAddress } from "@/lib/utils"
import Link from "next/link"
import { IoSwapHorizontal } from "react-icons/io5"

export default function Body() {
    return (
        <div className="min-h-screen w-full relative py-10">
            {/* Search */}
            <Search />
            <div className="max-w-7xl mx-auto mt-6">
                <div className="flex items center gap-4">
                    <Button>Latest Transactions</Button>
                </div>
                <div className="rounded-2xl p-2 bg-[#111111] overflow-hidden mt-4">
                    {/* <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-xl border-b-3 border-[#005664]">
                    <H2>Latest Blocks</H2>
                </div> */}
                    <Table className="overflow-hidden">
                        <TableHeader className="border-b border-white/10">
                            <TableRow>
                                <TableHead><P14>Type / Tx</P14></TableHead>
                                <TableHead><P14>Sender</P14></TableHead>
                                <TableHead><P14>Receiver</P14></TableHead>
                                <TableHead ><P14>Amount</P14></TableHead>
                                <TableHead className="text-end"><P14>Timestamp</P14></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                Array.from({ length: 10 }).map((_, i) => {
                                    return (
                                        <TableRow key={i} className="px-4 border-white/10 text-white/50">
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-full bg-white/20 p-2">
                                                        <IoSwapHorizontal size={20} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Link href={`/tx/${i}`}><P14>{shortAddress('iourwdsfw3423')}</P14></Link>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            
                                            <TableCell>
                                                <div className="space-y-3">
                                                    <P14>From: <span className="border border-white/5 rounded-sm px-2">{shortAddress('iourwdsfw3423')}</span></P14>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-3">
                                                    <P14>To: <span className="border border-white/5 rounded-sm px-2">{shortAddress('iourwdsfw3423')}</span></P14>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-2">
                                                    <P14 className="font-medium">40 CED</P14>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-end">
                                                <P14>2 secs ago</P14>
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
    )
}