import Body from "./Body";

type PageParams = {
    versionOrHash: string;
}

export default async function TransactionPage({ params }: { params: Promise<PageParams> }) {
    const versionOrHash = (await params).versionOrHash;
    return <Body versionOrHash={versionOrHash} />
}
