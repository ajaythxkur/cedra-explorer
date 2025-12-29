'use client';
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5"
import { useState, useEffect } from 'react'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <>
            {isClient ?
                <Button className="rounded-full" variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme == "light" ? <IoSunnyOutline className="h-5 w-5" /> : <IoMoonOutline className="h-5 w-5" />}
                </Button>
                : ''}
        </>
    )
}

