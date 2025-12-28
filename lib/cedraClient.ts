import { Cedra, CedraConfig, NetworkToNetworkName } from "@cedra-labs/ts-sdk"
import { NETWORK } from "./env"
function getCedraClient() {
    const cedraConfig = new CedraConfig({
        network: NetworkToNetworkName[NETWORK]
    });
    return new Cedra(cedraConfig)
}

export const cedraClient = getCedraClient()