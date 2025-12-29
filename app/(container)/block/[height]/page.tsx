import BlockTabs from "./BlockTabs";

type PageParams = {
    height: string;
}
export default async function BlockPage({ params }: { params: Promise<PageParams> }) {
    const height = (await params).height;
    return <BlockTabs blockHeight={parseInt(height)}/>
}