import { Block, Cedra } from "@cedra-labs/ts-sdk";
import { CEDRA_COIN } from "@cedra-labs/ts-sdk";

function calculateTps(startBlock: Block, endBlock: Block): number {
    const startTransactionVersion = parseInt(startBlock.last_version);
    const endTransactionVersion = parseInt(endBlock.last_version);

    const startTimestamp = parseInt(startBlock.block_timestamp);
    const endTimestamp = parseInt(endBlock.block_timestamp);
    const durationInSec = endTimestamp - startTimestamp;

    return (endTransactionVersion - startTransactionVersion) / durationInSec;
}

export async function getCoinTotalSupply(coin: string, client: Cedra, coinDecimals: number = 8) {
    const data = await client.view({
        payload: {
            function: `0x1::coin::supply`,
            typeArguments: [coin]
        }
    });
    const mappedData = data as [{ vec: [string] }];
    const val = mappedData[0]?.vec[0];
    if (val) {
        return parseInt(val) / Math.pow(10, coinDecimals)
    } else {
        return 0
    }
}

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

export async function getCedraValidator(client: Cedra) {
    const data: ValidatorSetData = await client.getAccountResource({ 
        accountAddress: "0x1", 
        resourceType: "0x1::stake::ValidatorSet" 
    });
    return data
}

export async function getTps(startBlockHeight: number, endBlockHeight: number, client: Cedra) {
    const startBlock = await client.getBlockByHeight({ blockHeight: startBlockHeight });
    const endBlock = await client.getBlockByHeight({ blockHeight: endBlockHeight });
    return calculateTps(startBlock, endBlock)
}

export function formatCompactNumber(value: number | string): string {
  const num = typeof value === "string" ? Number(value) : value;

  if (!Number.isFinite(num)) return "0";

  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2).replace(/\.00$/, "")}B`;
  }

  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  }

  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }

  return num.toString();
}