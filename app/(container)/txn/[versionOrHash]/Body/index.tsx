'use client'
import CopyAddress from "@/components/CopyAddress";
import { P14 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "@/context/AppProvider";
import dayjs from "dayjs";
import { getTransactionCounterparty } from "@/components/Transactions/utils";
import { isNumeric, shortAddress } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export default function Body({ versionOrHash }: { versionOrHash: string }) {
    const { state } = useApp();
    const { data: transaction } = useQuery({
        queryKey: ["transactions", versionOrHash, state.client.config.network],
        queryFn: () => {
            if (isNumeric(versionOrHash)) {
                return state.client.getTransactionByVersion({ ledgerVersion: parseInt(versionOrHash) })
            } else {
                return state.client.getTransactionByHash({ transactionHash: versionOrHash })
            }
        }
    })
    if (!transaction) {
        return (
            <div className="py-10">
                <Spinner className="mx-auto h-8 w-8" />
                <P14 className="text-center mt-4">Loading...</P14>
            </div>
        )
    };
    const counterParty = getTransactionCounterparty(transaction);
    return (
        <div className="max-w-7xl mx-auto mt-6 px-4">

            <div className="flex items center gap-1 bg-gray/5 w-fit p-1 rounded-md">
                <Button>Overview</Button>
                {/* <Button disabled variant="ghost">Raw</Button>
                <Button disabled variant="ghost">Internal Txns</Button> */}
            </div>
            <div className="bg-card p-4 rounded-xl mt-4 space-y-6 shadow">
                <div className="grid grid-cols-4 items-center">
                    <P14 className="col-span-2 md:col-span-1">Transaction Hash:</P14>
                    <div className="col-span-2 md:col-span-3 flex items-center gap-2">
                        <Badge variant="info" className="gap-4">
                            <P14 className="hidden md:block">{transaction.hash}</P14>
                            <P14 className="md:hidden">{shortAddress(transaction.hash)}</P14>
                            <CopyAddress address={transaction.hash} />
                        </Badge>
                    </div>
                </div>
                {
                    "version" in transaction && (
                        <div className="grid grid-cols-4 items-center">
                            <P14 className="col-span-2 md:col-span-1">Version:</P14>
                            <div className="col-span-2 md:col-span-3">
                                <P14 className="text-secondary">{parseInt(transaction.version)}</P14>
                            </div>
                        </div>
                    )
                }
                {
                    "success" in transaction && (
                        <div className="grid grid-cols-4 items-center">
                            <P14 className="col-span-2 md:col-span-1">Status:</P14>
                            <div className="col-span-2 md:col-span-3">
                                <Badge variant={`${transaction.success ? 'positive' : 'negative'}`}>{transaction.success ? "Success" : "Failed"}</Badge>
                            </div>
                        </div>
                    )
                }
                {
                    "timestamp" in transaction && (
                        <div className="grid grid-cols-4 items-center">
                            <P14 className="col-span-2 md:col-span-1">Timestamp:</P14>
                            <div className="col-span-2 md:col-span-3">
                                <P14 className="leading-5">{dayjs(parseInt(transaction.timestamp) / 1000).format()}</P14>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="bg-card p-4 rounded-xl mt-4 space-y-6">
                {
                    "sender" in transaction && (
                        <div className="grid grid-cols-4 items-center">
                            <P14 className="col-span-2 md:col-span-1">Sender:</P14>
                            <div className="col-span-2 md:col-span-3 flex items-center gap-2">
                                <Badge variant="info" className="gap-4">
                                    <P14>{transaction.sender}</P14>
                                    <CopyAddress address={transaction.sender} />
                                </Badge>
                            </div>
                        </div>
                    )
                }
                {
                    counterParty && (
                        <div className="grid grid-cols-4 items-center">
                            <P14 className="col-span-2 md:col-span-1">{counterParty.role === "smartContract" ? "Contract" : "Sent To"}:</P14>
                            <div className="col-span-2 md:col-span-3 flex items-center gap-2">
                                <Badge variant="info" className="gap-4">
                                    <P14>{counterParty.address}</P14>
                                    <CopyAddress address={counterParty.address} />
                                </Badge>
                            </div>
                        </div>
                    )
                }
                {
                    "sequence_number" in transaction && (
                        <div className="grid grid-cols-4 items-center">
                            <P14 className="col-span-2 md:col-span-1">Sequence Number:</P14>
                            <div className="col-span-2 md:col-span-3">
                                <P14>{transaction.sequence_number}</P14>
                            </div>
                        </div>
                    )
                }

                {
                    "gas_unit_price" in transaction && (
                        <div className="grid grid-cols-4 items-center">
                            <P14 className="col-span-2 md:col-span-1">Gas Unit Price:</P14>
                            <div className="col-span-2 md:col-span-3">
                                <P14>{transaction.gas_unit_price}</P14>
                            </div>
                        </div>
                    )
                }

                {
                    "max_gas_amount" in transaction && (
                        <div className="grid grid-cols-4 items-center">
                            <P14 className="col-span-2 md:col-span-1">Max Gas Amount:</P14>
                            <div className="col-span-2 md:col-span-3">
                                <P14>{transaction.max_gas_amount}</P14>
                            </div>
                        </div>
                    )
                }

                {
                    "vm_status" in transaction && (
                        <div className="grid grid-cols-4 items-center">
                            <P14 className="col-span-2 md:col-span-1">VM Status:</P14>
                            <div className="col-span-2 md:col-span-3">
                                <P14>{transaction.vm_status}</P14>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}