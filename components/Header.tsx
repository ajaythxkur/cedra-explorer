'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
export function Header() {
    const [isSticky, setIsSticky] = useState(false)
    const navItems = [
        { title: "Home", url: "/" },
        { title: "Transactions", url: "/transactions" },
        { title: "Blocks", url: "/blocks" },
    ]
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setIsSticky(currentScroll >= 1)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <header className={`p-4 sticky  top-0 w-full z-90 transition-all duration-300 mx-auto    ${isSticky ? "bg-[#00444f] rounded-b-xl max-w-full" : "max-w-7xl"}`}>
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl">EXPLORER</h1>
                <nav className="flex items-center gap-6">
                    {
                        navItems.map((item, i) => {
                            return (
                                <Link key={i} href={`${item.url}`}>{item.title}</Link>
                            )
                        })
                    }
                </nav>
                <Button variant="outline">Connect Wallet</Button>
            </div>
        </header>
    )
}