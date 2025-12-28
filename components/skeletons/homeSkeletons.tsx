import { Skeleton } from "../ui/skeleton"
import { TableBody, TableCell, TableRow } from "../ui/table"

export default function BlocksLoading() {
    return (
        <TableBody>
            {
                Array.from({ length: 5 }).map((_, i) => {
                    return (
                        <TableRow key={i} className="px-4 border-white/10 text-white/50">
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-white/20 p-2">
                                        <Skeleton className="h-5 w-5 rounded-full bg-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-20 rounded-md" />
                                        <Skeleton className="h-3 w-15 rounded-md" />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-3 w-15 rounded-md" />
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="space-y-2 ">
                                    <Skeleton className="h-3 w-20 ms-auto rounded-md" />
                                    <Skeleton className="h-3 w-20 ms-auto rounded-md" />
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </TableBody>
    )
}

export function TransactionLoading() {
    return (
        <TableBody>
            {
                Array.from({ length: 5 }).map((_, i) => {
                    return (
                        <TableRow key={i} className="px-4 border-white/10 text-white/50">
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="rounded-full bg-white/20 p-2">
                                        <Skeleton className="h-5 w-5 ms-auto rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-20 ms-auto rounded-md" />
                                        <Skeleton className="h-3 w-15 ms-auto rounded-md" />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                               <Skeleton className="h-3 w-20 ms-auto rounded-md" />
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="space-y-2">
                                    <Skeleton className="h-3 w-15 ms-auto rounded-md" />
                                    <Skeleton className="h-3 w-10 ms-auto rounded-md" />
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </TableBody>
    )
}