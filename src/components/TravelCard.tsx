'use client'
import { VlogPlayer } from "./VlogPlayer"
import { useState } from "react"

export function TravelCard() {
    const [playing, setPlaying] = useState(true)

    return (
        <div className={`w-[80%] mx-auto my-10 p-6 rounded-lg shadow-2xl flex flex-row items-center transition-all duration-300 ease-in-out
            bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500 bg-opacity-90 hover:bg-opacity-100`}>
            <VlogPlayer isPlaying={playing} vdoSrc="/video/massageThump.mp4" />
            <div className="ml-10 flex flex-col justify-between">
                <h2 className="text-4xl font-serif font-semibold text-gray-100 mb-4">Exclusive Massage Shop</h2>
                <p className="text-gray-200 text-lg mb-6">Indulge in the ultimate relaxation experience crafted for your well-being.</p>
                
                <button
                    className={`text-lg font-serif font-semibold px-6 py-3 rounded-lg shadow-md 
                    ${playing ? 'bg-yellow-800 hover:bg-yellow-700' : 'bg-yellow-700 hover:bg-yellow-600'} 
                    text-white transition-colors duration-300 ease-in-out`}
                    onClick={() => setPlaying(!playing)}
                >
                    {playing ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    )
}