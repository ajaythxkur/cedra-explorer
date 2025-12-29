import { P14 } from "../typography"
import { Skeleton } from "../ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export default function BlocksLoading() {
    return (
        <Table className="overflow-hidden">
            <TableHeader className="border-b border-gray/5">
                <TableRow>
                    <TableHead><P14>Block</P14></TableHead>
                    <TableHead><P14>TimeStamp</P14></TableHead>
                    <TableHead><P14>First Version</P14></TableHead>
                    <TableHead><P14>Last Version</P14></TableHead>
                    <TableHead><P14>Tsn Count</P14></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from({ length: 5 }).map((_, i) => {
                        return (
                            <TableRow key={i} className="px-4 border-white/10 text-white/50">
                                <TableCell><Skeleton className="h-3 w-15 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-25 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export function TransactionLoading() {
    return (
        <Table className="overflow-hidden">
            <TableHeader className="border-b border-gray/5">
                <TableRow>
                    <TableHead><P14>Version</P14></TableHead>
                    <TableHead><P14>TimeStamp</P14></TableHead>
                    <TableHead><P14>From</P14></TableHead>
                    <TableHead><P14>To</P14></TableHead>
                    <TableHead><P14 className="text-end">Amount</P14></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from({ length: 5 }).map((_, i) => {
                        return (
                            <TableRow key={i} className="px-4 border-white/10 text-white/50">
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 ms-auto rounded-md" /></TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}

export function AllTransactionsLoading() {
    return (
        <Table className="overflow-hidden">
            <TableHeader className="border-b border-gray/5">
                <TableRow>
                    <TableHead><P14>Version</P14></TableHead>
                    <TableHead><P14>Type</P14></TableHead>
                    <TableHead><P14>Timestamp</P14></TableHead>
                    <TableHead><P14>From</P14></TableHead>
                    <TableHead><P14>To</P14></TableHead>
                    <TableHead><P14 className="text-end">Amount</P14></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from({ length: 20 }).map((_, i) => {
                        return (
                            <TableRow key={i} className="px-4 border-white/10 text-white/50">
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Skeleton className="h-3 w-20 rounded-md" />
                                        <Skeleton className="h-3 w-3 rounded-full" />
                                    </div>
                                </TableCell>
                                <TableCell><Skeleton className="h-4 w-4 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 ms-auto rounded-md" /></TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}


export function AllBlocksLoading() {
    return (
        <Table className="overflow-hidden">
            <TableHeader className="border-b border-gray/5">
                <TableRow>
                    <TableHead><P14>Block</P14></TableHead>
                    <TableHead><P14>Timestamp</P14></TableHead>
                    <TableHead><P14>#</P14></TableHead>
                    <TableHead><P14>Txn Count</P14></TableHead>
                    <TableHead><P14>First Version</P14></TableHead>
                    <TableHead><P14 className="text-end">Last Version</P14></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from({ length: 20 }).map((_, i) => {
                        return (
                            <TableRow key={i} className="px-4 border-white/10 text-white/50">
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-3 w-20 ms-auto rounded-md" /></TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}