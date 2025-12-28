import { Block, Cedra } from "@cedra-labs/ts-sdk";

export async function getRecentBlocks(
  currentBlockHeight: number,
  count: number,
  client: Cedra,
): Promise<Block[]> {
  const blockPromises = [];
  for (let i = 0; i < count; i++) {
    const block = client.getBlockByHeight({ blockHeight: currentBlockHeight - i, options: { withTransactions: false }});
    blockPromises.push(block);
  }
  return Promise.all(blockPromises);
}