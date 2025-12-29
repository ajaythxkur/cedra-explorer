'use client'
import CopyAddress from "@/components/CopyAddress";
import { TransactionsTable } from "@/components/Transactions/TransactionsTable";
import { H2, P14 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "@/context/AppProvider";
import dayjs from "dayjs";
import { isBlockMetadataTransactionResponse, TransactionResponse } from "@cedra-labs/ts-sdk";
import React from "react";
import { Spinner } from "@/components/ui/spinner";

interface BlockTabsProps {
    blockHeight: number;
}
export default function BlockTabs({ blockHeight }: BlockTabsProps) {
    const { state } = useApp()
    const { data: block } = useQuery({
        queryKey: ["block", blockHeight, state.client.config.network],
        queryFn: () => state.client.getBlockByHeight({ blockHeight, options: { withTransactions: true } })
    });
    if (!block) {
        return (
            <div className="py-10">
                <Spinner className="mx-auto h-8 w-8" />
                <P14 className="text-center mt-4">Loading...</P14>
            </div>
        )
    };
    const previousBlock = (parseInt(block.block_height) - 1).toString();
    const nextBlock = (parseInt(block.block_height) + 1).toString();
    const blockTransaction: TransactionResponse | undefined = (
        block.transactions ?? []
    ).find(isBlockMetadataTransactionResponse);
    return (
        <>
            <div className="max-w-7xl mx-auto mt-8">
                <H2 className="text-primary lg:text-2xl">Block Details</H2>
                <div className="bg-card p-4 rounded-xl mt-4 shadow space-y-6">
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Block Height:</P14>
                        <div className="col-span-3">
                            <P14>{block.block_height}</P14>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Transactions ({parseInt(block.last_version) - parseInt(block.first_version) + 1}):</P14>
                        <div className="col-span-3">
                            <P14 className="text-accent">{block.first_version} - {block.last_version}</P14>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">TimeStamp:</P14>
                        <div className="col-span-3">
                            <P14>{dayjs(parseInt(block.block_timestamp) / 1000).format()}</P14>
                        </div>
                    </div>
                    {
                        blockTransaction && (
                            <React.Fragment>
                                <div className="grid grid-cols-4 items-center">
                                    <P14 className="col-span-1">Proposer:</P14>
                                    <div className="col-span-3 flex items-center gap-2">
                                        <Badge variant="info" className="gap-4">
                                            <P14>{blockTransaction.proposer}</P14>
                                            <CopyAddress address={blockTransaction.proposer} />
                                        </Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center">
                                    <P14 className="col-span-1">Epoch:</P14>
                                    <div className="col-span-3">
                                        <P14>{blockTransaction.epoch}</P14>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center">
                                    <P14 className="col-span-1">Round:</P14>
                                    <div className="col-span-3">
                                        <P14>{blockTransaction.round}</P14>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }

                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Previous Block:</P14>
                        <div className="col-span-3">
                            <P14>{previousBlock}</P14>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Next Block:</P14>
                        <div className="col-span-3">
                            <P14>{nextBlock}</P14>
                        </div>
                    </div>
                </div>

                {
                    block.transactions && <>
                        <H2 className="text-primary mt-6">{block.transactions && block.transactions.length} Transactions</H2>
                        <div className="rounded-2xl p-2 bg-card overflow-hidden mt-4">
                            {
                                block.transactions && (
                                    <TransactionsTable transactions={block.transactions} />
                                )
                            }
                        </div>
                    </>
                }
            </div>
        </>
    )
}