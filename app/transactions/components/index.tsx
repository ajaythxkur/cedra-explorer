'use client'
import { Search } from "@/components/Search"
import { P14 } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { shortAddress } from "@/lib/utils"
import Link from "next/link"
import { IoSwapHorizontal } from "react-icons/io5"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "@tanstack/react-query"
import { useApp } from "@/context/AppProvider"
import { TransactionsTable } from "@/components/Transactions/TransactionsTable"
dayjs.extend(relativeTime);

const TRANSACTION_LIMIT = 10;
export default function Body() {
    const { state } = useApp()
    const { data: transactions } = useQuery({
        queryKey: [`transactions`, state.client.config.network],
        queryFn: () => state.client.getTransactions({
            options: {
                limit: TRANSACTION_LIMIT
            }
        })
    })
    return (
        <div className="min-h-screen w-full relative py-10">
            <Search />
            <div className="max-w-7xl mx-auto mt-6">
                <div className="flex items center gap-4">
                    <Button>Latest Transactions</Button>
                </div>
                <div className="rounded-2xl p-2 bg-[#111111] overflow-hidden mt-4">
                    {transactions && <TransactionsTable transactions={transactions}/>}
                </div>
            </div>
        </div>
    )
}