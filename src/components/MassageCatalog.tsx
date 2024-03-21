import Link from "next/link";
import ProductCard from "./ProductCard";
import { MassageItem, MassageJson } from "../../interfaces";

export default async function MassageCatalog({massageJson}:{massageJson:MassageJson}) {
    const massageJsonReady = await massageJson
    return (
        <>
            Explore {massageJsonReady.count} massage shop in our catalog
            <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent: "space-around", alignContent:"space-around"}}>
                {
                    massageJsonReady.data.map((massageItem: MassageItem)=>(
                        <Link href={`/massage/${massageItem._id}`}
                        className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                        <ProductCard massageName={massageItem.name} imgSrc={massageItem.picture}/>
                        </Link>
                        )
                    )
                }
            </div> 
        </>
    )
}