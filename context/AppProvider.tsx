"use client"
import { Cedra, LedgerInfo } from "@cedra-labs/ts-sdk";
import { useContext, createContext, useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getCedraClient } from "@/lib/getCedraClient";
import { useQuery } from "@tanstack/react-query";
import { P16 } from "@/components/typography";
import { Spinner } from "@/components/ui/spinner";

type GlobalState = {
    client: Cedra;
}

interface AppContextType {
    state: GlobalState;
    updateNetwork: (name: string) => void;
    ledgerData: LedgerInfo;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const network = searchParams.get("network") ?? "testnet";
    const [state, setState] = useState<GlobalState>({
        client: getCedraClient(network)
    })
    const { data: ledgerData } = useQuery({
        queryKey: ["ledgerInfo", state.client.config.network],
        queryFn: () => state.client.getLedgerInfo(),
    });

    function updateNetwork(networkName: string) {
        setState({
            client: getCedraClient(networkName)
        })
    };

    if (!ledgerData) {
        return (
            <div className="fixed inset-0 flex flex-col gap-4 items-center justify-center">
                <Spinner className="h-10 w-10 text-primary" />
                <P16>Loading...</P16>
            </div>

        )
    };

    return (
        <AppContext.Provider value={{
            state,
            updateNetwork,
            ledgerData
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within a AppProvider");
    }
    return context;
}