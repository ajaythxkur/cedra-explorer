'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Network } from "@cedra-labs/ts-sdk"
import { useApp } from "@/context/AppProvider"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./ThemeToggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { MdKeyboardArrowDown } from "react-icons/md"
import { HiOutlineMenu } from "react-icons/hi"
import { IoCloseOutline } from "react-icons/io5"
import { Tagesschrift } from 'next/font/google'
const font = Tagesschrift({
    weight: ["400"],
    subsets: ["latin"]
})
export function Header() {
    const pathname = usePathname()
    const { state, updateNetwork } = useApp()
    const [isSticky, setIsSticky] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
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
        <header className={`p-4 py-2 md:y-4 sticky top-0 w-full z-50 transition-all duration-300 mx-auto ${isSticky ? "bg-background shadow max-w-full" : "max-w-7xl"}`}>
            <div className="flex items-center justify-between">
                <Link href={"/"}><h1 className={`font-bold text-lg text-primary dark:text-foreground ${font.className}`}>CEDRA EXPLORER</h1></Link>
                <nav className="hidden md:flex items-center gap-6">
                    {
                        navItems.map((item, i) => {
                            const isActive =
                                item.url === '/'
                                    ? pathname === '/'
                                    : pathname === item.url || pathname.startsWith(item.url + '/')

                            return (
                                <Link key={i} href={`${item.url}`} className={`hover:text-primary ${isActive ? 'text-primary font-medium' : ''}`}>{item.title}</Link>
                            )
                        })
                    }
                </nav>
                <div className="hidden md:flex items-center gap-3 text-end">
                    <ThemeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="capitalize " asChild>
                            <Button variant="outline">
                                {state.client.config.network}
                                <MdKeyboardArrowDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="capitalize cursor-pointer" onClick={() => updateNetwork(Network.TESTNET)}>{Network.TESTNET}</DropdownMenuItem>
                            <DropdownMenuItem className="capitalize cursor-pointer" onClick={() => updateNetwork(Network.DEVNET)}>{Network.DEVNET}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button disabled>Connect Wallet</Button>
                </div>
                <Button onClick={() => setIsMobile(true)} className="md:hidden"><HiOutlineMenu /></Button>
            </div>

            {/* Mobile */}
            <div className={`bg-card dark:bg-black z-90 fixed w-full top-0 right-0 h-lvh transition-all duration-500 p-4 ${isMobile ? 'translate-x-0' : 'translate-x-full'}`}>
                <IoCloseOutline className="text-foreground ms-auto" onClick={() => setIsMobile(false)} size={24} />
                <nav className="flex flex-col items-center gap-6 mt-8">
                    {
                        navItems.map((item, i) => {
                            const isActive =
                                item.url === '/'
                                    ? pathname === '/'
                                    : pathname === item.url || pathname.startsWith(item.url + '/')

                            return (
                                <Link
                                    key={i}
                                    href={`${item.url}`}
                                    className={`hover:text-primary ${isActive ? 'text-primary font-medium' : ''}`}
                                    onClick={() => setIsMobile(false)}
                                >
                                    {item.title}
                                </Link>
                            )
                        })
                    }
                </nav>
                <div className="flex flex-wrap items-center justify-center gap-3 text-end mt-10">
                    <ThemeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger className="capitalize " asChild>
                            <Button variant="outline">
                                {state.client.config.network}
                                <MdKeyboardArrowDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="capitalize cursor-pointer" onClick={() => updateNetwork(Network.TESTNET)}>{Network.TESTNET}</DropdownMenuItem>
                            <DropdownMenuItem className="capitalize cursor-pointer" onClick={() => updateNetwork(Network.DEVNET)}>{Network.DEVNET}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button disabled>Connect Wallet</Button>
                </div>
            </div>
        </header>
    )
}