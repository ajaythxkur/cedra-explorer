'use client'
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group"
import { SearchIcon } from "lucide-react"
import { P14 } from "./typography"
import { useEffect, useState } from "react"
import { HiOutlineInbox } from "react-icons/hi"
export function Search() {
    const [search, setSearch] = useState('')
    const [debSearch, setDebSearch] = useState('')
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebSearch(search)
        }, 1000)
        return () => clearTimeout(timeout)
    }, [search])
    return (
        <div className="max-w-xl mx-auto relative z-20">
            <h1 className="text-4xl font-bold text-white text-center relative z-10">Cedra Explorer</h1>
            <InputGroup className="border border-white/20 p-5 mt-6 rounded-full">
                <InputGroupInput
                    placeholder="Search by address / transaction"
                    className="text-lg ps-0 text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon className="px-0">
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
            {
                debSearch &&
                <div className="rounded-xl bg-[#1a2022] absolute top-30 w-full border border-white/20 text-white overflow-hidden max-h-100 overflow-y-auto">

                    {/* if Results */}
                    <div className="flex items-center gap-4 p-4 border-b hover:bg-white/10 border-b-white/10">
                        <P14>0xbf6e46b179150c1250e7826b57b2017b223a15bfa3f8227f5fd0646f530df202</P14>
                    </div>
                    <div className="flex items-center gap-4 p-4 border-b hover:bg-white/10 border-b-white/10">
                        <P14>0xbf6e46b179150c1250e7826b57b2017b223a15bfa3f8227f5fd0646f530df202</P14>
                    </div>

                    {/* No Results */}
                    <div className="py-4 text-center space-y-3 text-white/50">
                        <HiOutlineInbox size={32} className="mx-auto" />
                        <P14>No Results.</P14>
                    </div>
                </div>
            }
        </div>
    )
}