import Link from "next/link"
export function Header() {
    return (
        <header className="flex justify-between p-4">
            <h1 className="font-bold text-2xl">EXPLORER</h1>
            <div className="flex gap-4 font-medium">
                <Link href={"/"}>Home</Link>
                <Link href={"/"}>Transactions</Link>
                <Link href={"/"}>Blocks</Link>
            </div>
            <button className="bg-white text-black p-2 font-medium cursor-pointer rounded-xl">Connect Wallet</button>
        </header>
    )
}