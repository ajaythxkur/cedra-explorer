'use client'
import { H2, P14, P16 } from "@/components/typography";
import { LedgerInfo, CEDRA_COIN, Block } from "@cedra-labs/ts-sdk";
import { useApp } from "@/context/AppProvider";
import { useQuery } from "@tanstack/react-query";
import { formatCompactNumber, getCedraValidator, getCoinTotalSupply, getTps } from "./utils";

const TPS_FREQUENCY = 600;

export default function Stats() {
    const { state, ledgerData } = useApp();
    const { data: totalSupply } = useQuery({
        queryKey: ["totalSupply", state.client.config.network],
        queryFn: () => getCoinTotalSupply(CEDRA_COIN, state.client)
    });
    const { data: cedraValidatorData } = useQuery({
        queryKey: ["cedraValidatorData", state.client.config.network],
        queryFn: () => getCedraValidator(state.client)
    });
    // const { data: tps } = useQuery({
    //     queryKey: ["tps", ledgerData.block_height,state.client.config.network],
    //     queryFn: () => getTps(parseInt(ledgerData.block_height) - TPS_FREQUENCY, parseInt(ledgerData.block_height), state.client)
    // });
    return (
        <>
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 items-center justify-between max-w-6xl mx-auto mt-6 md:mt-10 gap-2 md:gap-6 px-4">
                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-card dark:hover:bg-white/8 transition-all duration-300">
                    <div className="p-3 rounded-b-xl text-center border-b border-secondary/40">
                        <P16 className="font-medium">Total Transactions</P16>
                    </div>
                    <div className="px-1 py-4">
                        <H2 className="text-center font-bold">{parseInt(ledgerData.ledger_version).toLocaleString("en-US")}</H2>
                    </div>
                </div>

                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-card dark:hover:bg-white/8 transition-all duration-300">
                    <div className="p-3 rounded-b-xl text-center border-b border-secondary/40">
                        <P16 className="font-medium">Total Supply</P16>
                    </div>
                    <div className="px-1 py-4">
                        {/* <H2 className="text-center font-bold">{totalSupply ? totalSupply.toLocaleString("en-US") : "-"}</H2> */}
                        <H2 className="text-center font-bold">{totalSupply ? formatCompactNumber(totalSupply) : "-"}</H2>
                    </div>
                </div>

                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-card dark:hover:bg-white/8 transition-all duration-300">
                    <div className="p-3 rounded-b-xl text-center border-b border-secondary/40">
                        <P16 className="font-medium">Total Cedra Staked</P16>
                    </div>
                    <div className="px-1 py-4">
                        <H2 className="text-center font-bold">{cedraValidatorData ? (parseInt(cedraValidatorData.total_voting_power) / Math.pow(10, 8)).toLocaleString("en-US") : "-"}</H2>
                    </div>
                </div>
                
                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-card dark:hover:bg-white/8 transition-all duration-300">
                    <div className="p-3 rounded-b-xl text-center border-b border-secondary/40">
                        <P16 className="font-medium">Active Validators</P16>
                    </div>
                    <div className="px-1 py-4">
                        <H2 className="text-center font-bold">{cedraValidatorData ? cedraValidatorData.active_validators.length.toLocaleString("en-US") : "-"}</H2>
                    </div>
                </div>
            </div>
        </>
    )
}