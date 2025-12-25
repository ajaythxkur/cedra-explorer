import { cn } from "@/lib/utils"
import { type HTMLAttributes, forwardRef, ElementType } from "react"

type TypographyElement = HTMLHeadingElement | HTMLParagraphElement | HTMLElement
type FontWeight = "regular" | "medium" | "semibold" | "bold"

type TypographyTag =
    | "h1"
    | "h2"
    | "button16"
    | "button14"
    | "p"
    | "p16"
    | "p14"
    | "p12"

interface TypographyProps extends HTMLAttributes<TypographyElement> {
    as?: TypographyTag
    weight?: FontWeight
}

const Typography = forwardRef<TypographyElement, TypographyProps>(
    ({ className, as = "p", children, ...props }, ref) => {
        const Component = (["h1", "h2",].includes(as) ? as : "p") as ElementType

        /**(16px = 1rem)*/
        const variants: Record<TypographyTag, string> = {
            h1: "text-[1.75rem] leading-[1.75rem] font-manrope",          // 28px
            h2: "text-[1rem] md:text-[1.25rem] leading-[1.25rem] font-manrope font-medium",          // 24px

            button16: "text-[1rem] leading-[1rem] font-manrope",  // 16px
            button14: "text-sm leading-[14px] font-manrope",  // 14px

            p: "text-[1rem] leading-[1rem] font-manrope",  // 16px
            p16: "text-[1rem] leading-[1rem] font-manrope",  // 16px
            p14: "text-sm leading-[14px] font-manrope",  // 14px
            p12: "text-xs leading-[12px] font-manrope",  // 12px
        }

        return (
            <Component
                className={cn(variants[as], className)}
                ref={ref}
                {...props}
            >
                {children}
            </Component>
        )
    },
)

Typography.displayName = "Typography"

export { Typography }

// Prebuilt components:
export const H1 = (props: TypographyProps) => <Typography as="h1" {...props} />
export const H2 = (props: TypographyProps) => <Typography as="h2" {...props} />

export const Button16 = (props: TypographyProps) => <Typography as="button16" {...props} />
export const Button14 = (props: TypographyProps) => <Typography as="button14" {...props} />

export const P16 = (props: TypographyProps) => <Typography as="p16" {...props} />
export const P14 = (props: TypographyProps) => <Typography as="p14" {...props} />
export const P12 = (props: TypographyProps) => <Typography as="p12" {...props} />
