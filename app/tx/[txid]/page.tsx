import Body from "./components";

export default async function TxPage({params}:{params:Promise<{txid:string}>}){
    const {txid} = await params;
    return(
        <Body txid={txid}/>
    )

}