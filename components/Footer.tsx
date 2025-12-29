'use client'
import { LiaTelegram } from "react-icons/lia";
import { P12 } from "./typography";
import { FaXTwitter } from "react-icons/fa6";
import { RxDiscordLogo } from "react-icons/rx";

export default function Footer() {
    const date = new Date();
    const current_year = date.getFullYear()
    return (
        <footer className="border-t px-6 py-3 border-primary">
            <div className="flex items-center justify-between">
                <P12>@{current_year}, All rights reserved.</P12>
                <div className="flex items-center gap-4">
                    <LiaTelegram size={16} />
                    <FaXTwitter size={16} />
                    <RxDiscordLogo size={16} />
                </div>
            </div>
        </footer>
    )
}