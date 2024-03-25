'use client'
import { useRef } from "react"
import { useEffect } from "react"

export function VlogPlayer(
    {vdoSrc, isPlaying}: {vdoSrc:string, isPlaying:boolean}) {
        const vdoRef = useRef<HTMLVideoElement>(null)
        
        useEffect(()=>{
            if(isPlaying){
                
                vdoRef.current?.play()
            } else {
                
                vdoRef.current?.pause()
            }
        }, [isPlaying])

        return (
            <video className="w-[40%] flex-none w-1/2 rounded-lg overflow-hidden shadow-lg" src={vdoSrc} ref={vdoRef} loop controls/>
        )
    }