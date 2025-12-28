'use client'
import CopyAddress from "@/components/CopyAddress";
import { Search } from "@/components/Search";
import { P14 } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Body({ txid }: { txid: string }) {
    return (
        <div className="min-h-screen w-full relative py-10">
            {/* Search */}
            <Search />
            <div className="max-w-7xl mx-auto mt-6">
                <div className="flex items center gap-4">
                    <Button>Overview</Button>
                    <Button disabled>Raw</Button>
                    <Button disabled>Internal Txns</Button>
                </div>
                <div className="bg-[#1a2022] p-4 rounded-xl mt-4 text-white/70 space-y-6">
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Transaction Hash:</P14>
                        <div className="col-span-3 flex items-center gap-2">
                            <Badge variant="info" className="gap-4">
                                <P14>0xbf6e46b179150c1250e7826b57b2017b223a15bfa3f8227f5fd0646f530df202</P14>
                                <CopyAddress address={'sfsdf'} />
                            </Badge>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Block:</P14>
                        <div className="col-span-3">
                            <P14>#{(345674).toLocaleString()}</P14>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Status:</P14>
                        <div className="col-span-3">
                            <Badge variant="positive">Success</Badge>
                            <Badge variant="negative">Failed</Badge>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Timestamp:</P14>
                        <div className="col-span-3">
                            <P14>12/26/2025 20:36:27.715</P14>
                        </div>
                    </div>
                </div>

                {/* Block-2 */}
                <div className="bg-[#1a2022] p-4 rounded-xl mt-4 text-white/70 space-y-6">
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Sender:</P14>
                        <div className="col-span-3 flex items-center gap-2">
                            <Badge variant="info" className="gap-4">
                                <P14>0xbf6e46b179150c1250e7826b57b2017b223a15bfa3f8227f5fd0646f530df202</P14>
                                <CopyAddress address={'sfsdf'} />
                            </Badge>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Contract:</P14>
                        <div className="col-span-3 flex items-center gap-2">
                            <Badge variant="info" className="gap-4">
                                <P14>0xbf6e46b179150c1250e7826b57b2017b223a15bfa3f8227f5fd0646f530df202</P14>
                                <CopyAddress address={'sfsdf'} />
                            </Badge>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Amount:</P14>
                        <div className="col-span-3">
                            34.46
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Transaction Fee:</P14>
                        <div className="col-span-3">
                            <P14>0.00</P14>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Gas Fee:</P14>
                        <div className="col-span-3">
                            <P14>0.00</P14>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Max Gas Limit:</P14>
                        <div className="col-span-3">
                            <P14>0.00</P14>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Gas Unit Price:</P14>
                        <div className="col-span-3">
                            <P14>0.00 CED</P14>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                        <P14 className="col-span-1">Gas Fees:</P14>
                        <div className="col-span-3">
                            <P14>0.00</P14>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}