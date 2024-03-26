import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@mui/material';
import { useEffect } from 'react';
import getUserProfile from "@/libs/getUserProfile";


export default async function TopMenu(){

    const session = await getServerSession(authOptions)
    // console.log("ccc",session?.user)


    return (
        <nav className="backdrop-blur-md bg-opacity-30 bg-black text-white w-full fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 font-serif text-white">
                <div className="flex justify-between h-16 font-serif text-white">
                    <div className="flex text-white">
                        <div className="absolute left-4 top-2 flex items-center text-white">
                            <Image src={'/img/massage-logo1.png'} alt='logo' width={45} height={50} layout='fixed' />
                        </div>
                        <div className="hidden md:flex space-x-10 text-white">
                            <TopMenuItem title='Select Massage Shop' pageRef='/massage'/>
                            <TopMenuItem title='About' pageRef='/about'/>
                        </div>
                    </div>
                    <div className="flex items-center space-x-10 font-serif text-white">
                        <TopMenuItem title='Manage' pageRef='/reservations/manage'/>
                        <TopMenuItem title='My Appointment' pageRef='/cart'/>
                        <TopMenuItem title='Register' pageRef='/register'/>

                {
                    session? <Link href="/api/auth/signout">
                        <div className='absolute right-4 top-3 cursor-pointer text-white px-4 py-2 hover:underline font-serif text-white'>
                             Sign-Out 
                        </div>
                    </Link>
                    : <Link href="/api/auth/signin">
                        <div className='px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-opacity-50 hover: underline font-serif text-white'>
                            Sign-In
                        </div>
                    </Link>
                }
            </div>
                </div>
            </div>
        </nav>
    );
}