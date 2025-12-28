'use client'
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { SearchIcon } from "lucide-react"
import { P14 } from "./typography"
import React, { useCallback, useEffect, useState } from "react"
import { HiOutlineInbox } from "react-icons/hi"
import { is32ByteHex, isNumeric } from "@/lib/utils"
import { useApp } from "@/context/AppProvider"
import Link from "next/link"
type SearchResult = {
    label: string;
    to: string | null;
};

type SearchMode = "idle" | "loading" | "results"
export function Search() {
    const { state } = useApp()
    const [search, setSearch] = useState('')
    const [debSearch, setDebSearch] = useState('');
    const [mode, setMode] = useState<SearchMode>("idle")
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    function handleBlockHeightOrVersion(
        searchText: string,
    ): Promise<SearchResult | null>[] {
        const num = parseInt(searchText);
        const promises = [];
        const blockByHeightPromise = state.client.getBlockByHeight(
            { blockHeight: num, options: { withTransactions: false } },
        )
            .then((): SearchResult => {
                return {
                    label: `Block ${num}`,
                    to: `/block/${num}`,
                };
            })
            .catch(() => {
                return null;
            });

        const blockByVersionPromise = state.client.getBlockByVersion(
            { ledgerVersion: num },
        )
            .then((block): SearchResult => {
                return {
                    label: `Block with Txn Version ${num}`,
                    to: `/block/${block.block_height}`,
                };
            })
            .catch(() => {
                return null;
            });
        const transactionByVersion = state.client.getTransactionByVersion(
            { ledgerVersion: num },
        )
            .then((): SearchResult => {
                return {
                    label: `Transaction Version ${num}`,
                    to: `/txn/${num}`,
                };
            })
            .catch(() => {
                return null;
            });
        promises.push(transactionByVersion);
        promises.push(blockByHeightPromise);
        promises.push(blockByVersionPromise);
        return promises;
    }

    async function handleTransaction(
        searchText: string,
    ): Promise<SearchResult | null> {
        return state.client.getTransactionByHash({ transactionHash: searchText })
            .then((): SearchResult => {
                return {
                    label: `Transaction ${searchText}`,
                    to: `/txn/${searchText}`,
                };
            })
            .catch(() => {
                return null;
            });
    }

    const fetchData = useCallback(async () => {
        try {
            if(debSearch === "") throw new Error("Nothing to search")
            setMode("loading")
            const isBlockHeightOrVersion = isNumeric(debSearch);
            const is32Hex = is32ByteHex(debSearch);
            const promises = [];
            if (isBlockHeightOrVersion) {
                promises.push(...handleBlockHeightOrVersion(debSearch))
            } else if (is32Hex) {
                promises.push(handleTransaction(debSearch))
            }
            const resultsList: (SearchResult | null)[] = [];
            if (promises) {
                const results = await Promise.all(promises);
                resultsList.push(...results);
            }
            const results = resultsList
                .filter((result) => result !== null)
                .filter((result): result is SearchResult => !!result);

            if (results.length === 0) {
                results.push({ label: "No Results Found", to: null })
            }
            setSearchResults(results);
            setMode("results");
        } catch (error) {
            console.log(`Error in fetchData: ${error}`)
            setMode("idle")
            setSearchResults([])
        }
    }, [debSearch, setMode]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebSearch(search)
        }, 500)
        return () => clearTimeout(timeout)
    }, [search])
    useEffect(() => {
        fetchData()
    }, [fetchData])
    return (
        <div className="max-w-xl mx-auto relative z-20">
            <h1 className="text-4xl font-bold text-white text-center relative z-10">Cedra Explorer</h1>
            <InputGroup className="border border-white/20 p-5 mt-6 rounded-full">
                <InputGroupInput
                    placeholder="Search by Version/ Hash/ Block"
                    className="text-lg ps-0 text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon className="px-0">
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
            {
                mode === "loading" && (
                    <div className="rounded-xl bg-[#1a2022] absolute top-30 w-full border border-white/20 text-white overflow-hidden max-h-100 overflow-y-auto">
                        <div className="flex items-center gap-4 p-4 border-b hover:bg-white/10 border-b-white/10">
                            <P14>Loading...</P14>
                        </div>
                    </div>
                )
            }
            {
                searchResults.length > 0 && mode === "results" &&  (
                    <div className="rounded-xl bg-[#1a2022] absolute top-30 w-full border border-white/20 text-white overflow-hidden max-h-100 overflow-y-auto">
                        {
                            searchResults.map((res, i) => (
                                <React.Fragment key={`${i}-searchResult`}>
                                    {
                                        res.to ? (
                                            <div className="flex items-center gap-4 p-4 border-b hover:bg-white/10 border-b-white/10">
                                                <Link href={res.to} onClick={() => {
                                                    setSearch("")
                                                }}><P14>{res.label}</P14></Link>
                                            </div>
                                        )
                                            :
                                            (
                                                <div className="py-4 text-center space-y-3 text-white/50">
                                                    <HiOutlineInbox size={32} className="mx-auto" />
                                                    <P14>No Results.</P14>
                                                </div>
                                            )
                                    }
                                </React.Fragment>
                            ))
                        }
                    </div>
                )
            }

        </div >
    )
}