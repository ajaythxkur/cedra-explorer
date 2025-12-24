"use client"

import { getCedraClient } from "@/lib/cedraClient"
import { TransactionResponse } from "@cedra-labs/ts-sdk";
import { useState, useEffect } from "react"

export function Home() {
    const cedraClient = getCedraClient();
    const [latestTransactions, setLatestTransactions] = useState<TransactionResponse[]>()
    const [ledgerInfo, setLedgerInfo] = useState();
    useEffect(() => {
        (async() => {
            try {
                const data = await cedraClient.getTransactions({
                    options: {
                        limit: 5
                    }
                });
                setLatestTransactions(data.reverse());
            } catch (error) {
                console.error(`Failed to get latest transactions: ${error}`)
            }
        })()
    }, [])
    return (
        <div>
            <div className="flex justify-center">
                <p>Version</p>
                <p>From</p>
                <p>To</p>
                <p>Amount</p>
            </div>
            {
                latestTransactions && latestTransactions.map(txn => (
                    <div className="flex justify-center" key={txn.hash}>
                        <p>{txn.hash}</p>
                        <p>From</p>
                        <p>To</p>
                        <p>Amount</p>
                    </div>
                ))
            }
        </div>
    )
}