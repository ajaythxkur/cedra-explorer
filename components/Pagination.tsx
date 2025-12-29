'use client'
import { Button } from "@/components/ui/button";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";
import { Button14 } from "./typography";
import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
    currentPage: number
    setCurrentPge: Dispatch<SetStateAction<number>>
    totalPages: number
}
export default function Pagination({ currentPage, setCurrentPge, totalPages }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-8 w-full max-w-md mx-auto flex items-center gap-10 pb-6">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPge(p => p - 1)}><HiOutlineArrowLeft size={14} /> <Button14>Previous</Button14></Button>
            {/* <div className="flex items-center gap-3">
                {Array.from({ length: totalPages }).map((_, i) => {
                    const index = i + 1
                    const isActive = currentPage === index
                    return (
                        <Button variant={`${isActive ? 'default' : 'outline'}`} size="xs" className="" onClick={() => setCurrentPge(index)}>{i + 1}</Button>
                    )
                })}
            </div> */}
            <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPge(p => p + 1)}> <Button14>Next</Button14> <HiOutlineArrowRight size={14} /></Button>

        </div>
    )
}