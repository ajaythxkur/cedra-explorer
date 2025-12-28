'use client'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "@tanstack/react-query"
import { useApp } from "@/context/AppProvider"
import { TransactionsTable } from "@/components/Transactions/TransactionsTable"
import { Button } from "@/components/ui/button";
dayjs.extend(relativeTime);

const TRANSACTION_LIMIT = 20;
export default function TransactionsPage() {
    const { state } = useApp()
    const { data: transactions } = useQuery({
        queryKey: [`transactions`, state.client.config.network],
        queryFn: () => state.client.getTransactions({
            options: {
                limit: TRANSACTION_LIMIT,
            }
        })
    })
    return (
        <div className="max-w-7xl mx-auto mt-6">
            <div className="flex items center gap-4">
                <Button>Latest Transactions</Button>
            </div>
            <div className="rounded-2xl p-2 bg-[#   ] overflow-hidden mt-4">
                {transactions && <TransactionsTable transactions={transactions} />}
            </div>
        </div>
    )
}