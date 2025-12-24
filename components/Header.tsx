import Link from "next/link"
import { Button } from "./ui/button"
export function Header() {
    const navItems = [
        { title: "Home", url: "/" },
        { title: "Transactions", url: "/transactionss" },
        { title: "Blocks", url: "/blocks" },
    ]
    return (
        <header className="p-4 border-b">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl">EXPLORER</h1>
                <nav className="flex items-center gap-6">
                    {
                        navItems.map((item, i) => {
                            return (
                                <Link href={`${item.url}`}>{item.title}</Link>
                            )
                        })
                    }
                </nav>
                <Button variant="outline">Connect Wallet</Button>
            </div>
        </header>
    )
}