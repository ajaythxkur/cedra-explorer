'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoInformationCircleOutline } from "react-icons/io5"
import { H2 } from "./typography"
export default function TypesModal() {
    return (
        <Dialog>
            <DialogTrigger><IoInformationCircleOutline size={16} />
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader className="hidden">
                    <DialogTitle>{''}</DialogTitle>
                </DialogHeader>
                <H2 className="text-center">Transaction Types</H2>

            </DialogContent>
        </Dialog>
    )
}