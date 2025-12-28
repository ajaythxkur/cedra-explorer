'use client'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useQuery } from "@tanstack/react-query"
import { useApp } from "@/context/AppProvider"
import { getRecentBlocks } from "@/components/Blocks/utils"
import { BlocksTable } from "@/components/Blocks/BlocksTable"
import { Button } from "@/components/ui/button"
dayjs.extend(relativeTime);
const BLOCK_COUNT = 30;

export default function BlocksPage() {
    const { state, ledgerData } = useApp();
    const { data: blocks } = useQuery({
        queryKey: ["blocks", ledgerData.block_height, state.client.config.network],
        queryFn: async () => {
            return getRecentBlocks(parseInt(ledgerData.block_height), BLOCK_COUNT, state.client);
        },
    });
    return (
        <div className="max-w-7xl mx-auto mt-6">
            <div className="flex items center gap-4">
                <Button>Latest Transactions</Button>
            </div>
            <div className="rounded-2xl p-2 bg-[#111111] overflow-hidden mt-4">
                {blocks && <BlocksTable blocks={blocks} />}
            </div>
        </div>

    )
}