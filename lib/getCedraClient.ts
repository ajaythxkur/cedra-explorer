import { Cedra, CedraConfig, NetworkToNetworkName } from "@cedra-labs/ts-sdk"

export function getCedraClient(networkName: string) {
    const cedraConfig = new CedraConfig({
        network: NetworkToNetworkName[networkName]
    });
    return new Cedra(cedraConfig)
}

export const cedraClient = getCedraClient("testnet")