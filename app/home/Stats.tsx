'use client'
import { H2, P14, P16 } from "@/components/typography";
import { cedraClient } from "@/lib/cedraClient";
import { LedgerInfo, CEDRA_COIN, Block } from "@cedra-labs/ts-sdk";
import { useCallback, useEffect, useState } from "react";

interface ValidatorSetData {
  active_validators: Validator[];
  total_voting_power: string;
}

export interface Validator {
  addr: string;
  config: {
    consensus_pubkey: string;
    fullnode_addresses: string;
    network_addresses: string;
    validator_index: string;
  };
  voting_power: string;
}

const TPS_FREQUENCY = 600;

function calculateTps(startBlock: Block, endBlock: Block): number {
  const startTransactionVersion = parseInt(startBlock.last_version);
  const endTransactionVersion = parseInt(endBlock.last_version);

  const startTimestamp = parseInt(startBlock.block_timestamp);
  const endTimestamp = parseInt(endBlock.block_timestamp);
  const durationInSec = endTimestamp - startTimestamp;

  return (endTransactionVersion - startTransactionVersion) / durationInSec;
}

export default function Stats() {
    const [ledgerData, setLedgerData] = useState<LedgerInfo>();
    const [totalSupply, setTotalSupply] = useState<number>();
    const [totalVotingPower, setTotalVotingPower] = useState<number>();
    const [activeValidators, setActiveValidators] = useState<number>();
    const [tps, setTps] = useState<number>();

    const getLedgerInfo = useCallback(async () => {
        try {
            const data = await cedraClient.getLedgerInfo();
            setLedgerData(data)
        } catch (error) {
            console.log(`Error in getLedgerInfo: ${error}`)
        }
    }, []);

    const getCoinTotalSupply = useCallback(async() => {
        try {
            const data = await cedraClient.view({
                payload: {
                    function: `0x1::coin::supply`,
                    typeArguments: [CEDRA_COIN]
                }
            });
            const mappedData = data as [{vec: [string]}];
            const val = mappedData[0]?.vec[0];
            if(val) {
                setTotalSupply(Number(val) / Math.pow(10, 8))
            }
        } catch (error) {
            console.log(`Error in getLedgerInfo: ${error}`)
        }
    }, [])

    const getTotalVotingPower = useCallback(async() => {
        try {
            const data: ValidatorSetData = await cedraClient.getAccountResource({ accountAddress: "0x1", resourceType: "0x1::stake::ValidatorSet" });
            setActiveValidators(data.active_validators.length);
            setTotalVotingPower(Number(data.total_voting_power) / Math.pow(10, 8));
        } catch (error) {
            console.log(`Error in getTotalVotingPower: ${error}`)
        }
    }, []);

    const getTps = useCallback(async() => {
        try {
            if(!ledgerData) return;
            const startBlock = await cedraClient.getBlockByHeight({ blockHeight: parseInt(ledgerData.block_height) - TPS_FREQUENCY })
            const endBlock = await cedraClient.getBlockByHeight({ blockHeight: parseInt(ledgerData.block_height) });
            setTps(calculateTps(startBlock, endBlock));
        } catch (error) {
            console.log(`Error in getTps: ${error}`)
        }
    }, [ledgerData])
    
    useEffect(() => {
        getLedgerInfo()
        getCoinTotalSupply()
        getTotalVotingPower()
    }, [getLedgerInfo, getCoinTotalSupply, getTotalVotingPower])

    useEffect(()=>{
        getTps()
    },[getTps])
    return (
        <>
            <div className="relative z-10 grid grid-cols-4 items-center justify-between max-w-6xl mx-auto mt-10 gap-6">
                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/10 hover:bg-white/8 transition-all duration-300">
                    <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-b-xl border-b-3 border-[#005664]">
                        <P16 className="font-medium">Total Transactions</P16>
                    </div>
                    <div className="px-1 py-1">
                        <div className="space-y-1 py-4 pb-1 text-white/80">
                            <H2 className="text-center font-bold">{ledgerData ? parseInt(ledgerData.ledger_version).toLocaleString("en-US") : "-"}</H2>
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
                        <P16 className="font-medium">Total Supply</P16>
                    </div>
                    <div className="px-1 py-1">
                        <div className="space-y-1 py-4 pb-1 text-white/80">
                            <H2 className="text-2xl text-center font-bold">{totalSupply ? totalSupply.toLocaleString("en-US") : "-"}</H2>
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

                <div className="rounded-xl overflow-hidden backdrop-blur-lg bg-white/10 hover:bg-white/8 transition-all duration-300">
                    <div className="bg-[#00444f] text-white backgrop-blur-xl p-3 rounded-b-xl border-b-3 border-[#005664]">
                        <P16 className="font-medium">Total Stake</P16>
                    </div>
                    <div className="px-1 py-1">
                        <div className="space-y-1 py-4 pb-1 text-white/80">
                            <H2 className="text-2xl text-center font-bold">#{totalVotingPower ? totalVotingPower.toLocaleString("en-US") : "-"}</H2>
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
                        <P16 className="font-medium">TPS</P16>
                    </div>
                    <div className="px-1 py-1">
                        <div className="space-y-1 py-4 pb-1 text-white/80">
                            <H2 className="text-2xl text-center font-bold">{tps ? tps.toLocaleString("en-US") : "-"}</H2>
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