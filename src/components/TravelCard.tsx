'use client'
import { VlogPlayer } from "./VlogPlayer"
import { useState } from "react"

export function TravelCard() {
    const [playing, setPlaying] = useState(true)

    return (
        <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-gray-200 flex flex-row">
            <VlogPlayer isPlaying={playing} vdoSrc="/video/massageThump.mp4"></VlogPlayer>
            <div className="m-5">
                Massage Shop
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
                onClick={()=>setPlaying(!playing)}>
                    {playing? 'Pause':'Play'}
                </button>
            </div>
        </div>
    )
}