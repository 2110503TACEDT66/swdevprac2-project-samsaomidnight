'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useEffect } from 'react';
import getUserProfile from "@/libs/getUserProfile";


export default function Banner(){
    const covers = ['/img/masBanner.jpg','/img/masBanner1.jpg','/img/masBanner2.jpg']
    const [index, setIndex] = useState(0);
    const router = useRouter()
    const { data: session } = useSession();

    // Initialize `profile` with an object that has an empty `data` object.
    const [profile, setProfile] = useState<{ data?: { name?: string } }>({ data: {} });
  
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
                    <h1 className='text-6xl text-white font-serif font-light mb-4'>Escape. Recharge. Revitalize.</h1>
                    <h3 className='text-2xl text-white font-serif mb-8'>Find serenity, heal your body, renew your spirit</h3>

                    {
                    session? <div className='text-xl font-serif text-white mb-6'>
                        Welcome {profile.data.name}
                    </div>:null
                }

                    <button className='text-lg text-cyan-600 bg-white border border-cyan-600 font-serif font-semibold py-2 px-4 rounded hover:bg-cyan-600 hover:text-white hover:border-transparent transition-colors duration-300 ease-in-out'
                onClick={(e)=>{ e.stopPropagation(); router.push('/massage') }}>
                    Pick your perfect massage shop now
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
                <div className={styles.bannerText}>
                    <h1 className='text-5xl font-bold font-serif font-bold'>Escape. Recharge. Revitalize.</h1>
                    <h3 className='text-xl font-serif p-4'>Find serenity, heal your body, renew your spirit</h3>
                    <button className='font-serif bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded hover:bg-cyan-600 hover:text-white hover:border-transparent'
                onClick={(e)=>{ e.stopPropagation(); router.push('/massage') }}>
                    Pick your perfect massage shop now
                </button>
                </div>
            </div>
        )
    }


    
}