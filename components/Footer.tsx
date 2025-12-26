import { P12, P14 } from "./typography";

export default function Footer() {
    return (
        <footer className="border-t px-6 py-3 border-white/20">
            <div className="flex items-center justify-between">
                <P12>All rights reserved.</P12>
                <div className="flex items-center gap-6">
                    <P14>Twitter</P14>
                    <P14>Telegram</P14>
                    <P14>Discord</P14>
                </div>
            </div>
        </footer>
    )
}