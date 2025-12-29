'use client'
import { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import { useCopyToClipboard } from "usehooks-ts";
import { P14 } from "./typography";
type CopyProps = {
    address: string
    className?:string
}
export default function CopyAddress({ address, className }: CopyProps) {
    const [copiedText, copy] = useCopyToClipboard()
    const [copied, setCopied] = useState(false)
    function handleCopy(text: string) {
        copy(text)
            .then(() => {
                setCopied(true)
                setTimeout(() => {
                    setCopied(false)
                }, 3000)
            })
            .catch(error => {
                console.error('Failed to copy!', error)
                setCopied(false)
            })
    }
    return (

        <span onClick={() => handleCopy(address)} >
            {/* <P14 className="font-medium">Copy Address</P14> */}
            {
                !copied ?
                    <BsCopy size={16} className={`h-3.5 w-3.5 cursor-pointer text-secondary ${className}`}/>
                    :
                    <IoCheckmarkDone className="text-green-600" />
            }
        </span>

    )
}