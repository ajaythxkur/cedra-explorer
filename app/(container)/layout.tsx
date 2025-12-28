import { Search } from "@/components/Search";

export default function ContainerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full relative py-10">
            <Search />
            {children}
        </div>
    )
}