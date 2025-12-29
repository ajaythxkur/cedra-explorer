'use client'
import CopyAddress from "@/components/CopyAddress";
import { TransactionsTable } from "@/components/Transactions/TransactionsTable";
import { P14 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlockTabsProps{
    height:string
}
export default function BlockTabs({height}:BlockTabsProps) {
    //get block transactions
    //get block details
    return (
        <>
            <div className="max-w-7xl mx-auto">
                <Tabs defaultValue="overview">
                    <TabsList className="bg-white/10">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <div className="bg-[#1a2022] p-4 rounded-xl mt-4 text-white/70 space-y-6">
                            <div className="grid grid-cols-4 items-center">
                                <P14 className="col-span-1">Block Height:</P14>
                                <div className="col-span-3">
                                    <P14>345643</P14>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <P14 className="col-span-1">Transactions (3):</P14>
                                <div className="col-span-3">
                                    <P14>345643 -345646</P14>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <P14 className="col-span-1">TimeStamp:</P14>
                                <div className="col-span-3">
                                    <P14>12/29/2025 10:19:58.124</P14>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <P14 className="col-span-1">Proposer:</P14>
                                <div className="col-span-3 flex items-center gap-2">
                                    <Badge variant="info" className="gap-4">
                                        <P14>{'dkjfksdferer'}</P14>
                                        <CopyAddress address={'sdjfwejfiewfsf'} />
                                    </Badge>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <P14 className="col-span-1">Round:</P14>
                                <div className="col-span-3">
                                    <P14>3456</P14>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <P14 className="col-span-1">Previous Block:</P14>
                                <div className="col-span-3">
                                    <P14>235463434</P14>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center">
                                <P14 className="col-span-1">Next Block:</P14>
                                <div className="col-span-3">
                                    <P14>34534534</P14>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="transactions">
                        <TransactionsTable
                            transactions={[]}
                        />
                    </TabsContent>
                </Tabs>

            </div>
        </>
    )
}