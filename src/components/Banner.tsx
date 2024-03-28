'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { useEffect } from 'react';
import getUserProfile from "@/libs/getUserProfile";


export default function Banner(){
    const covers = ['/img/masBanner.jpg','/img/masBanner1.jpg','/img/masBanner2.jpg']
    const [index, setIndex] = useState(0);
    const router = useRouter()
    const { data: session } = useSession();

    // Initialize `profile` with an object that has an empty `data` object.
    const [profile, setProfile] = useState<{ data?: { name?: string }}>({ data: {} });
  
    useEffect(() => {
      async function fetchProfile() {
        if (session?.user?.token) {
          try {
            const profileData = await getUserProfile(session.user.token);
            setProfile(profileData);
          } catch (error) {
            console.error("Failed to fetch profile", error);
            // Handle errors, perhaps by setting an error state or using a default profile value
          }
        }
      }
  
      if (session) {
        fetchProfile();
      }
    }, [session]);
    // console.log("banner", session?.user)


    if(session && profile.data && profile.data.name){
        return(
            <div className={styles.banner} onClick={()=>setIndex(index+1)}>
                <Image src={covers[index%3]}
                alt = 'cover'
                fill={true}
                className='object-cover'
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-8">
                <h1 className='text-6xl text-white font-serif font-bold mb-4'>Escape.</h1>
                    <h1 className='text-6xl text-white font-serif font-bold mb-4'>Recharge.</h1>
                    <h1 className='text-6xl text-white font-serif font-bold mb-4'>Revitalize.</h1>
                    <h3 className='text-xl text-white font-serif mb-12'>Find serenity, heal your body, renew your spirit</h3>

                    {
                    session? <div className='text-xl font-serif font-thin text-white mb-12'>
                        Welcome {profile.data.name}
                    </div>:null
                }

                    <button className='text-lg text-black bg-white font-serif  py-2 px-20 rounded-3xl  hover:bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 bg-opacity-90 transition-colors duration-300 ease-in-out'
                onClick={(e)=>{ e.stopPropagation(); router.push('/massage') }}>
                    Discover now
                </button>


                </div>
    
               

            </div>
        );
    }

    else{
        return(
            <div className={styles.banner} onClick={()=>setIndex(index+1)}>
                <Image src={covers[index%3]}
                alt = 'cover'
                fill={true}
                className='object-cover'
                />
               <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-8">
               <h1 className='text-6xl text-white font-serif font-bold mb-4'>Escape.</h1>
                    <h1 className='text-6xl text-white font-serif font-bold mb-4'>Recharge.</h1>
                    <h1 className='text-6xl text-white font-serif font-bold mb-4'>Revitalize.</h1>
                    <h3 className='text-xl text-white font-serif mb-12'>Find serenity, heal your body, renew your spirit</h3>

               
                    <button className='text-lg text-black bg-white font-serif  py-2 px-20 rounded-3xl  hover:bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 bg-opacity-90 transition-colors duration-300 ease-in-out'
                onClick={(e)=>{ e.stopPropagation(); router.push('/massage') }}>
                    Discover now
                </button>
                </div>
            </div>
        )
    }


    
}