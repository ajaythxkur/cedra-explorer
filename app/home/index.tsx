"use client"

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCedraClient } from "@/lib/cedraClient"
import { TransactionResponse } from "@cedra-labs/ts-sdk";
import { useState, useEffect } from "react"

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
        <section className="py-10 px-6">
            <div className="max-w-xl mx-auto">
                <Input
                    type="text"
                    placeholder="Search by Address, transaction"
                />
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 mt-10">
                <div className="p-10 rounded-2xl border"></div>
                <div className="p-10 rounded-2xl border"></div>
                <div className="p-10 rounded-2xl border"></div>
                <div className="p-10 rounded-2xl border"></div>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="rounded-xl border p-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-10">Txn.</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">---</TableCell>
                                <TableCell>--</TableCell>
                                <TableCell>---</TableCell>
                                <TableCell>---</TableCell>
                                <TableCell className="text-right">---</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="rounded-xl border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-10">Txn.</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">---</TableCell>
                                <TableCell>--</TableCell>
                                <TableCell>---</TableCell>
                                <TableCell>---</TableCell>
                                <TableCell className="text-right">---</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>

        // <div>
        //     <div className="flex justify-center">
        //         <p>Version</p>
        //         <p>From</p>
        //         <p>To</p>
        //         <p>Amount</p>
        //     </div>
        //     {
        //         latestTransactions && latestTransactions.map(txn => (
        //             <div className="flex justify-center" key={txn.hash}>
        //                 <p>{txn.hash}</p>
        //                 <p>From</p>
        //                 <p>To</p>
        //                 <p>Amount</p>
        //             </div>
        //         ))
        //     }
        // </div>
    )
}