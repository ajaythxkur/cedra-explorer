'use client'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "@tanstack/react-query"
import { useApp } from "@/context/AppProvider"
import { TransactionsTable } from "@/components/Transactions/TransactionsTable"
import { H2 } from "@/components/typography";
import { AllTransactionsLoading } from "@/components/skeletons/homeSkeletons";
import { useState } from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";
dayjs.extend(relativeTime);

const TRANSACTION_LIMIT = 20;
export default function TransactionsPage() {
    const { state } = useApp()
    const [page, setPage] = useState(1);

    const { data: transactions, isLoading: txnLoading } = useQuery({
        queryKey: [`transactions`, state.client.config.network, page],
        queryFn: () => state.client.getTransactions({
            options: {
                limit: TRANSACTION_LIMIT,
                // offset,
            }
        }),
    })
    return (
        <div className="max-w-7xl mx-auto mt-8">
            <H2 className="text-primary lg:text-2xl">Latest Transactions</H2>
            <div className="rounded-2xl p-2 bg-card shadow overflow-hidden mt-6">
                {
                    txnLoading ?
                        <AllTransactionsLoading />
                        :
                        transactions && <TransactionsTable transactions={transactions} />
                }
            </div>
            <div className="mt-8 w-full mx-auto flex items-center justify-center gap-10 pb-6">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><HiOutlineArrowLeft size={14} /> Previous</Button>
                <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)}>Next <HiOutlineArrowRight size={14} /></Button>
            </div>

        </div>
    )
}