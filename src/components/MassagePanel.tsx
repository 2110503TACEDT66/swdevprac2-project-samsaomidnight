'use client'
import { useReducer, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useRef, useEffect } from "react";
import getMassages from "@/libs/getMassages";
import { MassageItem } from "../../interfaces";

export default function MassagePanel() {

    const [massageResponse, setMassageResponse] = useState<any | null>(null);
    useEffect(()=>{
        const fetchData = async () => {
            const massages = await getMassages()
            setMassageResponse(massages)
        }
        fetchData()
    }, [])

    const countRef = useRef(0)
    const inputRef = useRef<HTMLInputElement>(null)

    const compareReducer = (compareList:Set<string>, action:{type:string, massageName:string}) => {
        switch(action.type){
            case 'add' : {
                return new Set(compareList.add(action.massageName))
            }
            case 'remove' : {
                compareList.delete(action.massageName)
                return new Set(compareList)
            }
            default: return compareList
        }
    }
    const [compareList, dispatchCompare] = useReducer(compareReducer, new Set<string>())

    if(!massageResponse) return(<p>Car Panel is Loading...</p>)

    return(
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent: "space-around", alignContent:"space-around"}}>
                {
                    massageResponse.data.map((massageItem:MassageItem)=>(
                        <Link href={`/car/${massageItem._id}`} className="w-1/5">
                        <ProductCard massageName={massageItem.name} imgSrc={massageItem.picture}
                        onCompare={ (massage:string)=>dispatchCompare({type:'add', massageName:massage}) } />
                        </Link>
                        )
                    )
                }
            </div> 
            <div className="w-full text-xl font-medium">
                Compare List {compareList.size}
            </div> 
            {Array.from(compareList).map((massage)=><div key={massage}
            onClick={()=>dispatchCompare({type:'remove', massageName:massage})}
            >{massage}</div>)}

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
            onClick={()=>{countRef.current = countRef.current+1; alert(countRef.current)}}>
                Count with Ref Object
            </button>  

            <input type="text" placeholder="please fill" className="block text-gray-900 text-sm 
            rounded-lg p-2 m-2 bg-purple-50 ring-1 ring-inset ring-purple-400
            focus:outline-none focus:bg-purple-200 focus:ring-2"
            ref={inputRef} />

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
            onClick={()=>{ if(inputRef.current!=null) inputRef.current.focus()}}>
                Focus Input
            </button>

        </div>
    );
}