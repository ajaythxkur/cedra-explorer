'use client'
import { H2, P14, P16 } from "@/components/typography";

export default function Stats() {
    return (
        <>
            <div className="relative z-10 grid grid-cols-3 items-center justify-between max-w-4xl mx-auto mt-10 gap-6">
                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/10 hover:bg-white/8 transition-all duration-300">
                    <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-b-xl border-b-3 border-[#005664]">
                        <P16 className="font-medium">Total Transactions</P16>
                    </div>
                    <div className="px-1 py-1">
                        <div className="space-y-1 py-4 pb-1 text-white/80">
                            <H2 className="text-center font-bold">{(3452334).toLocaleString()}</H2>
                            <P14 className="text-center text-sx"></P14>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">TPS</P14>
                            <P14 className=" text-white/60">23</P14>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">24h Peak TPS</P14>
                            <P14 className=" text-white/60">234</P14>
                        </div>

                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">Total Accounts</P14>
                            <P14 className=" text-white/60">{(2323423).toLocaleString()}</P14>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">24h New Accounts</P14>
                            <P14 className=" text-white/60">23</P14>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/10 hover:bg-white/8 transition-all duration-300">
                    <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-b-xl border-b-3 border-[#005664]">
                        <P16 className="font-medium">Current Block</P16>
                    </div>
                    <div className="px-1 py-1">
                        <div className="space-y-1 py-4 pb-1 text-white/80">
                            <H2 className="text-2xl text-center font-bold">#{(41234).toLocaleString()}</H2>
                            <P14 className="text-center text-sx"></P14>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">Avg. Block Time</P14>
                            <P14 className=" text-white/60">0.4 secs</P14>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">Gas Price</P14>
                            <P14 className=" text-white/60">102 GWei</P14>
                        </div>

                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">Transactions</P14>
                            <P14 className=" text-white/60">10</P14>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">AVG Gas per Txn</P14>
                            <P14 className=" text-white/60">0.0745</P14>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/10 hover:bg-white/8 transition-all duration-300">
                    <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-b-xl border-b-3 border-[#005664]">
                        <P16 className="font-medium">CED Price</P16>
                    </div>
                    <div className="px-1 py-1">
                        <div className="space-y-1 py-4 pb-1 text-white/80">
                            <H2 className="text-2xl text-center font-bold">$0.23</H2>
                            <P14 className="text-center text-sx"></P14>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">Total Contracts</P14>
                            <P14 className=" text-white/60">0.4 secs</P14>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">24h New Contracts</P14>
                            <P14 className=" text-white/60">{(1334).toLocaleString()}</P14>
                        </div>

                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">Total Tokens</P14>
                            <P14 className=" text-white/60">{(34534).toLocaleString()}</P14>
                        </div>
                        <div className="flex items-center justify-between p-2">
                            <P14 className=" text-white/60">24h New Tokens</P14>
                            <P14 className=" text-white/60">234</P14>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}