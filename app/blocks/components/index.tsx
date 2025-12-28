'use client'
import { Search } from "@/components/Search"
import { H2, P14 } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LuBox } from "react-icons/lu"

export default function Body() {
    return (
        <div className="min-h-screen w-full relative py-10">
            {/* Search */}
            <Search />
            <div className="max-w-7xl mx-auto mt-6">
                <div className="flex items center gap-4">
                    <Button>Latest Blocks</Button>
                </div>
                <div className="rounded-2xl p-2 bg-[#111111] overflow-hidden mt-4">
                    {/* <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-xl border-b-3 border-[#005664]">
                    <H2>Latest Blocks</H2>
                </div> */}
                    <Table className="overflow-hidden">
                        <TableHeader className="border-b border-white/10">
                            <TableRow>
                                <TableHead><P14>Type / Block</P14></TableHead>
                                <TableHead><P14>Proposed By</P14></TableHead>
                                <TableHead><P14>Total Txns.</P14></TableHead>
                                <TableHead ><P14>Rewards</P14></TableHead>
                                <TableHead className="text-end"><P14>Timestamp</P14></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                Array.from({ length: 10 }).map((_,i) => {
                                    return (
                                        <TableRow key={i} className="px-4 border-white/10 text-white/80">
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="rounded-full bg-white/20 p-2">
                                                        <LuBox size={20} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <P14>#44380896</P14>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <P14>Proposed by: Allnodes</P14>
                                            </TableCell>
                                            <TableCell>
                                                <P14>10</P14>
                                            </TableCell>
                                            <TableCell>
                                                <P14>40 CED</P14>
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