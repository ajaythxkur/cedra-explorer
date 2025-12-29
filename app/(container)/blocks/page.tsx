'use client'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useQuery } from "@tanstack/react-query"
import { useApp } from "@/context/AppProvider"
import { getRecentBlocks } from "@/components/Blocks/utils"
import { BlocksTable } from "@/components/Blocks/BlocksTable"
import { Button } from "@/components/ui/button"
import { AllBlocksLoading } from "@/components/skeletons/homeSkeletons"
import { H2 } from "@/components/typography"
import { useState } from "react"
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi"
dayjs.extend(relativeTime);
const BLOCK_COUNT = 30;

export default function BlocksPage() {
    const { state, ledgerData } = useApp();
    const [page, setPage] = useState(1);
    const offset = (page - 1) * BLOCK_COUNT;
    const { data: blocks, isLoading: blocksLoading, error } = useQuery({
        queryKey: ["blocks", ledgerData.block_height, state.client.config.network],
        queryFn: async () => {
            return getRecentBlocks(parseInt(ledgerData.block_height), BLOCK_COUNT, state.client);
        },
    });
    return (
        <div className="max-w-7xl mx-auto mt-8">
            <H2 className="text-primary lg:text-2xl">Latest Blocks</H2>
            <div className="rounded-2xl p-2 bg-card overflow-hidden mt-6">
                {
                    blocksLoading ?
                        <AllBlocksLoading />
                        :
                        blocks && <BlocksTable blocks={blocks} />
                }
            </div>
            <div className="mt-8 w-full mx-auto flex items-center justify-center gap-10 pb-6">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><HiOutlineArrowLeft size={14} /> Previous</Button>
                <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)}>Next <HiOutlineArrowRight size={14} /></Button>
            </div>
        </div>

    )
}